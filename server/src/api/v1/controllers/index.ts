import { Controller, Get, Route, Tags } from 'tsoa';
import { IApiResponse } from '../interfaces/api-response';

@Route('')
export class IndexController extends Controller {

  /**
   * Base URL.
   */
  @Get('')
  @Tags('General')
  public index(): IApiResponse<string> {
    return {
      success: true,
      data: 'Welcome to SpamDB!',
    };
  }

}
