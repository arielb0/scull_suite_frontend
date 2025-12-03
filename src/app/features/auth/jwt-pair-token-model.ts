import { JwtAccessTokenModel } from "./jwt-access-token-model";
import { JwtRefreshTokenModel } from "./jwt-refresh-token-model";

export interface JwtPairTokenModel extends JwtAccessTokenModel, JwtRefreshTokenModel {}
