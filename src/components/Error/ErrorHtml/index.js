import {errorFullScreenHtml} from './errorFullScreenHtml';
import {errorLocalHtml} from './errorLocalHtml';
import{ERROR_FULL_SCREEN_ID, ERROR_LOCAL_ID} from '../../../constants/root';

const errorHtml = {
    [ERROR_FULL_SCREEN_ID]: errorFullScreenHtml,
    [ERROR_LOCAL_ID]: errorLocalHtml,  
};

export default errorHtml;