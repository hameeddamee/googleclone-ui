import React, { useState } from "react";
import {

  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import classnames from "classnames";
import { Collapse } from "reactstrap";
import { withTranslation } from "react-i18next";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import selectIcon from "../../assets/icons/select.svg";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
      
    },
  },
  icon: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#CACACA",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 40,
      height: 40,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },

  
  },
  textColor: {
    color: "#848484"
  }
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      color={clsx(classes.textColor)}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const CollapsibleTab = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { title, className, children } = props;
  const [activeTab, setActiveTab] = useState("1");
  const [collapse, setCollapse] = useState(true);
  const [status, setStatus] = useState("closed");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
    setCollapse(!collapse);
  };

  const onEntering = () => {
    setStatus("opening");
  };

  const onEntered = () => {
    setStatus("opened");
  };

  const onExiting = () => {
    setStatus("closing");
  };

  const onExited = () => {
    setStatus("closed");
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Col md={12} lg={6} xl={6}>
      <div className="tabs tabs--justify">
        <div className={`tabs__wrap`}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Fabric Type <ChevronDownIcon />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Fabric Color <ChevronDownIcon />
              </NavLink>
            </NavItem>
          </Nav>

          <Collapse
            isOpen={collapse}
            className="collapse__content"
            onEntering={onEntering}
            onEntered={onEntered}
            onExiting={onExiting}
            onExited={onExited}
          >
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="carousel" aria-label="Gallery">
                  <ol className="carousel__viewport">
                    <li
                      id="carousel__slide1"
                      tabindex="0"
                      className="carousel__slide"
                    >
                      <div className="carousel__snapper">
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                          >
                            <FormControlLabel
                              value="cotton"
                              control={<StyledRadio />}
                              label="Cotton"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="cashmere"
                              control={<StyledRadio />}
                              label="Cashmere"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="Senator"
                              control={<StyledRadio />}
                              label="Senator"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="Atiku"
                              control={<StyledRadio />}
                              label="Atiku"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="Aso-oke"
                              control={<StyledRadio />}
                              label="Aso-oke"
                              labelPlacement="bottom"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </li>
                    <li
                      id="carousel__slide2"
                      tabindex="0"
                      className="carousel__slide"
                    >
                      <div className="carousel__snapper">
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                          >
                            <FormControlLabel
                              value="cotton"
                              control={<StyledRadio />}
                              label="Cotton"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="cashmere"
                              control={<StyledRadio />}
                              label="Cashmere"
                              labelPlacement="bottom"
                            />
                            <FormControlLabel
                              value="Senator"
                              control={<StyledRadio />}
                              label="Senator"
                              labelPlacement="bottom"
                            />
                        
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <a href="#carousel__slide1" className="carousel__prev"></a>
                      <a href="#carousel__slide3" className="carousel__next"></a>
                    </li>
                  
                  </ol>
                  <aside className="carousel__navigation">
                    <ol className="carousel__navigation-list">
                      <li className="carousel__navigation-item">
                        <a
                          href="#carousel__slide1"
                          className="carousel__navigation-button"
                        ></a>
                      </li>
                      <li className="carousel__navigation-item">
                        <a
                          href="#carousel__slide2"
                          className="carousel__navigation-button"
                        ></a>
                      </li>
                    
                    </ol>
                  </aside>
                </div>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>
          </Collapse>
        </div>
      </div>
    </Col>
  );
};

export default withTranslation("common")(CollapsibleTab);
