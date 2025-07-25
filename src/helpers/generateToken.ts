import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

interface IProps {
  payload: JwtPayload;
  secret: string;
  expireTime?: number | `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
}

export const generateToken = ({
  payload,
  secret,
  expireTime,
}: IProps): string => {
  const options: SignOptions = { expiresIn: expireTime };

  return jwt.sign(payload, secret, options);
};
