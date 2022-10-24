import Link from "next/link";
import Image from "next/future/image";
function NotFoundPage() {
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="central-body">
          <Image
            className="image-404"
            src="/images/404.svg"
            width={300}
            height={300}
            alt="404"
          ></Image>
          <Link href="/">
            <a className="btn-go-home">GO HOME</a>
          </Link>
        </div>
        <div className="objects">
          <Image
            className="object_rocket"
            src="/images/rocket.svg"
            alt="Rocket"
            width={40}
            height={40}
          ></Image>

          <div className="earth-moon">
            <Image
              className="object_earth"
              src="/images/earth.svg"
              alt="Earth"
              width={100}
              height={100}
            ></Image>
            <Image
              className="object_moon"
              src="/images/moon.svg"
              alt="Moon"
              width={80}
              height={80}
            ></Image>
          </div>

          <div className="box_astronaut">
            <Image
              className="object_astronaut"
              src="/images/astronaut.svg"
              alt="Astronaut"
              width={140}
              height={140}
            ></Image>
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
