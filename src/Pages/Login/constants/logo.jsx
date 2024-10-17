import { Apple, FaceBookColor, GoogleColor } from "../../../Components/Icons";

const LOGO_SIZE = 24;

export const loginLogoList = [
  {
    name: "Google",
    logo: <GoogleColor width={LOGO_SIZE} height={LOGO_SIZE} />
  },
  {
    name: "Facebook",
    logo: <FaceBookColor width={LOGO_SIZE} height={LOGO_SIZE} />
  },
  {
    name: "Apple",
    logo: <Apple width={LOGO_SIZE} height={LOGO_SIZE} />
  }
];
