import Image from "next/image";
import AboutUsImg from "../../../../public/images/aboutUs.png";


export default function AboutUsPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-10">
      <h1 className="h1-style">About Us</h1>

      <h2 className="h2-style">Welcome to ChessConnect - where chess becomes more than a game.</h2>
      <div className="flex gap-8 justify-between items-center">
        <div className="flex w-1/3 justify-start items-start">
          <Image src={AboutUsImg} alt="About Us" className="rounded-lg object-cover" />
        </div>
        <p className="p-style w-2/3"> At ChessConnect, we believe chess is not just about moves on a board. It is about strategy, growth, connection, and the thrill of challenging yourself with every decision. Our platform was created for adults who love chess, want to improve their skills, meet like-minded players, and enjoy a modern social space built around their passion.

          We saw a need for something more than a standard chess website. Players do not only want to play — they want to share ideas, discuss memorable games, discover inspiring content, follow strong personalities, and become part of a community that truly understands the beauty of chess. That is exactly why ChessConnect was born.

          Our mission is to bring together chess enthusiasts from different backgrounds, levels, and countries in one elegant and engaging platform. Whether you are a casual player, an ambitious improver, a blogger, a coach, or simply someone who enjoys the intellectual charm of the game, ChessConnect gives you a place to belong.

          Here, you can build your personal profile, explore articles and blog posts, engage with the community, like and share content, and stay connected with the latest discussions in the chess world. We combine the depth of chess culture with the convenience of a modern social network — creating a digital space that feels smart, dynamic, and inspiring.

          What makes ChessConnect special is our focus on quality, community, and experience. We want every visit to feel valuable — whether you come to learn something new, meet interesting people, promote your chess-related content, or simply enjoy being surrounded by others who think several moves ahead.

          We are building more than a platform. We are building a community for thinkers, competitors, creators, and chess lovers who appreciate both tradition and innovation. ChessConnect is a place where meaningful connections start, strong ideas are shared, and passion for chess turns into something bigger.
          <br /><b>Join ChessConnect and become part of a growing world where strategy meets community.</b>
        </p>
      </div>
    </div>
  );
}