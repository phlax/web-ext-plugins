
import {ExtensibleConfigurationType} from '../extensible';


export default class ServiceType extends ExtensibleConfigurationType {

    renderConfig (name) {
        return this.props.type.service.renderConfig(name)
    }
}
