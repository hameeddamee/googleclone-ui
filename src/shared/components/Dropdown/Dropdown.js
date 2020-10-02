import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import './Dropdown.css';

const DropdownMenu =  ({title, className, height, width, children}) => {
   
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
      if(!collapse){
        setCollapse(true)
      }
      else{
       setCollapse(false);
      }
    };
  
   
      return (
        <div className="dropdown-wrapper">
            <span>
            <span className="dropdown__button" type="button" onClick={toggle}>
           <p>{title}</p>
            <DownIcon className="dropdown__icon" />

            </span>
            </span>
           
          
          <Collapse isOpen={collapse} className="topbar__menu-wrap">
            <div className="topbar__menu">
                {children}
            </div>
          </Collapse>
        </div>
      );
    }
  
  
export default DropdownMenu;
  