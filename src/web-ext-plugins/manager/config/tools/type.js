
import {ExtensibleConfigurationType} from '../extensible';


export default class ToolType extends ExtensibleConfigurationType {

    renderConfig (name) {
        return this.props.type.tool.renderConfig(name)
    }
}
