import { HeaderContainer, TelIocon} from "./header.styled"
import icon from '../../images/symbol-defs.svg'

export const Header = () => {

    return (
        <HeaderContainer>
            <a href="/">
                Education Center
            </a>
            <a href="tel:+380930000000">
                 <TelIocon width="18" height="18" >
                    <use href={icon + '#icon-tel'} />
                </TelIocon>
                Call Us
            </a>            
       </HeaderContainer> 
    )
}    