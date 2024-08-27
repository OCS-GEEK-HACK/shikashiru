import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  // テキストデータを取得
  const voiceText: string | null = request.nextUrl.searchParams.get("text");
  // 環境変数からAPIキーを取得
  const apiKey: string = process.env.VOICEVOX_API_KEY || "";

  // 空白チェック
  if (!voiceText) {
    return NextResponse.json({message: "text parameter is required"}, { status: 400 });
  }

  try {
    const url: URL = new URL("https://api.tts.quest/v3/voicevox/synthesis");
    url.searchParams.set("text", voiceText);
    url.searchParams.set("speaker", "3");
    url.searchParams.set("key", apiKey);

    // 外部APIの呼び出し
    const apiResponse = await fetch(url, { cache: "force-cache" });
    const apiData = await apiResponse.json();

    const { mp3DownloadUrl, audioStatusUrl } = apiData;

    // URLがundefinedの場合はエラーを返す
    if (!mp3DownloadUrl || !audioStatusUrl) {
      return new NextResponse(
        JSON.stringify(
          "Missing required URLs: mp3DownloadUrl or audioStatusUrl.",
        ),
        { status: 400 },
      );
    }

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const statusResponse = await fetch(audioStatusUrl, {
        cache: "force-cache",
      });
      const statusJson = await statusResponse.json();

      if (statusJson.isAudioReady) break;
      if (statusJson.isAudioError) {
        return new NextResponse(JSON.stringify("Error in generating audio"), {
          status: 500,
        });
      }
    }

    const audioResponse = await fetch(mp3DownloadUrl);
    const audioArrayBuffer = await audioResponse.arrayBuffer();

    // ArrayBufferからBufferを作成する
    const audioBuffer = Buffer.from(new Uint8Array(audioArrayBuffer));

    // 音声ファイルを返す
    const response = new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify("Internal server error"), {
      status: 500,
    });
  }
};
