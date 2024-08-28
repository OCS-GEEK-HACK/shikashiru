import { Volume2Icon } from "@yamada-ui/lucide";
import { Motion, Heading, Text, IconButton } from "@yamada-ui/react";
import React, { useState, useEffect, FC } from "react";

// おみくじの内容をリストとして定義
const fortunes = [
  {
    type: "大吉",
    message:
      "今日は最高の日なのだ！お団子を奢ってもらえるかも？その後は徳融寺で歴史を感じて、運気をさらに上げるのだ！",
  },
  {
    type: "中吉",
    message:
      "まずまず良い日なのだ。鹿せんべいを忘れずに持っておくと吉なのだ！そのあとで徳融寺に立ち寄ると、ひょっとして良いことがあるかもなのだ！",
  },
  {
    type: "小吉",
    message:
      "少しラッキーな日なのだ。急な雨にはご注意なのだ！でも、元興寺に行けば、昔の瓦に触れてパワーが湧いてくるかもなのだ！",
  },
  {
    type: "凶",
    message:
      "くれぐれもおせんべいの取り扱いには注意なのだ。誤って全部食べられちゃっても、猿沢池園地でのんびりすれば心は晴れるのだ！",
  },
  {
    type: "凶",
    message:
      "もし鹿がツンツンしてきたら、一息ついて気持ちをリセットするのがおすすめなのだ。徳融寺で心を癒すのもアリなのだ！",
  },
  {
    type: "凶",
    message:
      "今日はあまり積極的に動かない方が良いかも。鹿に道を譲るのだ！猿沢池園地で、水面に映る景色を眺めて、ゆったり過ごすのが吉なのだ！",
  },
  {
    type: "大凶",
    message:
      "気をつけて！今日は家でゆっくり過ごすのが賢明なのだ。リラックス第一なのだ！でも、どうしても出かけたいなら元興寺がいいかも、昔の空気に包まれてみるのだ！",
  },
  {
    type: "大吉",
    message:
      "願いが叶う日なのだ！ただし、鹿に食べ物を持って行くのは慎重にするのだ！その後は元興寺で願掛けしておくとさらに効果抜群なのだ！",
  },
  {
    type: "中吉",
    message:
      "徳融寺に行くと、いいことがあるかもしれないのだ！歴史の息吹を感じて、中将姫の伝説に浸ってみると、きっと運気もアップなのだ！",
  },
  {
    type: "小吉",
    message:
      "元興寺を訪れると、運気がアップするかもなのだ！昔の瓦に触れて、古のパワーをもらったら、ついでにお土産もゲットするのだ！",
  },
  {
    type: "凶",
    message:
      "今日は猿沢池園地で、ゆったりと水面を眺めるのがおすすめなのだ。心が落ち着くのだ！鹿が寄ってきたら、そっとささやいてみよう「また今度ね」なのだ！",
  },
  {
    type: "大凶",
    message:
      "今日は何もしないのが一番なのだ。布団の中で本を読むのがおすすめなのだ！でも、どうしても外に出たいなら、徳融寺に足を運んでみるのも悪くないのだ、でも無理はしないのだ！",
  },
];

const Fortune: FC<{ showFortune: boolean }> = ({ showFortune }) => {
  const [fortune, setFortune] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (showFortune) {
      const randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
    }
  }, [showFortune]);

  if (!showFortune || !fortune) return null;

  const url = new URL("https://zunda-typing.onrender.com/voicevox");
  url.searchParams.set("text", fortune.message);
  const audio = new Audio(url.toString());

  const handlePlayAudio = () => {
    audio.play();
  };

  return (
    <Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      mt="20px"
      p="30px"
      w="500px"
      h="410px"
      bgImage="url(/icon/speech-bubble.png)"
      bgSize="cover"
      color="#60694B"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      fontSize="20px"
      position="fixed"
      bottom="120px"
      right="10px"
    >
      <Heading fontSize="24px" mb="10px" color="#4C6711">
        今日の運勢は{fortune.type}なのだ！
      </Heading>
      <Text mb="5">{fortune.message}</Text>
      <IconButton
        icon={<Volume2Icon />}
        colorScheme="teal"
        variant="outline"
        onClick={handlePlayAudio}
        aria-label="読み上げるのだ"
        alignSelf="center"
      />
    </Motion>
  );
};

export default Fortune;
