declare const JwtRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtRefreshGuard extends JwtRefreshGuard_base {
    constructor();
    handleRequest(err: any, user: any, info: Error): any;
}
export {};
