
import {ExtensibleConfiguration} from '../extensible';
import TabbedServices from './tabbed'


export default class ConfigureServices extends ExtensibleConfiguration {

    get configComponent() {
        return TabbedServices
    }
}
