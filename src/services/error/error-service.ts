import router from '../../router/router.ts';
import logger from '../log/console-logger.ts';

class ErrorService {
  public reportUnexpected(error: unknown): void {
    logger.error(error);
    router.instance().go('error500');
  }
}

export default new ErrorService();
