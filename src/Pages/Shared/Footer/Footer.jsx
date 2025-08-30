import React from "react";
import ProFastLogo from "../Project-Logo/ProFastLogo";
import { Link } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer rounded-2xl footer-horizontal footer-center bg-base-200 text-base-content npm run dev
             p-10"
      >
        <div className="grid gap-0">
          <ProFastLogo></ProFastLogo>
          <p className="text-c,">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <nav>
          <div className="grid grid-flow-col text-2xl gap-4">
            <a href="https://www.facebook.com/" target="blank">
              <FaFacebookF />
            </a>
            <a href="https://www.github.com/" target="blank">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <FaLinkedin />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            ProFast Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
