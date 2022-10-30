import axios from "axios";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalDialog from "../../components/modal-dialog";

export default function Register({ csrfToken }: { csrfToken: any }) {
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>();
  const router = useRouter();

  const onSubmit = (event: any) => {
    event.preventDefault();

    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      username: event.target.userName.value,
      password: event.target.password.value,
    };

    axios
      .post("http://localhost:1990/auth/register", data)
      .then((res) => router.push("/auth/login"))
      .catch((err) => {
        console.log(err);

        setIsShowMessage(true);
        setDialogMessage(err.response.data.message);
      });
  };
  return (
    <div className="bg-purple">
      <ModalDialog
        title={"Register Failed"}
        onClose={() => setIsShowMessage(false)}
        isShow={isShowMessage}
        data={{ message: dialogMessage }}
      />
      <div className="stars">
        <div className="central-body">
          <form method="post" className="login" onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                required
              ></input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                required
              ></input>
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                required
              ></input>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="User Name"
                required
              ></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              ></input>
            </div>
            <div className="d-flex">
              <Link href="/">
                <button
                  type="button"
                  title="Back"
                  className="btn-signin text-dark me-1"
                >
                  Back
                </button>
              </Link>

              <button
                type="submit"
                title="Register"
                className="btn-signin text-dark ms-1"
              >
                Register
              </button>
            </div>
            <Link href="/auth/login">or sign in with your account</Link>
          </form>
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
