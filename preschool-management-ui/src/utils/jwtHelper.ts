export interface JwtPayload {
    userId: string;
    userName: string;
    roleId: number;
    exp: number;
}

export function getJwtPayload(token: string): JwtPayload {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return {
        userId: decoded.userId,
        userName: decoded.userName,
        roleId: Number(decoded.roleId),
        exp: decoded.exp,
    };
}