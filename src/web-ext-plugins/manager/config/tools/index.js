
import {ExtensibleConfiguration} from '../extensible';
import TabbedTools from './tabbed'

export default class ConfigureTools extends ExtensibleConfiguration {

    get configComponent() {
        return TabbedTools
    }
}
