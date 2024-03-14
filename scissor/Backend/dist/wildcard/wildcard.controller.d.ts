import { WildcardService } from './wildcard.service';
import { Response } from 'express';
export declare class WildcardController {
    private readonly wildcardService;
    constructor(wildcardService: WildcardService);
    redirectURL(scissorPath: string, res: Response): Promise<any>;
}
