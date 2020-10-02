import React from "react";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import renderCheckBoxField from "../../CheckBox";

const ButtonTypeControls = ({ handleSubmit, t }) => (
  <form className="form form--preview" onSubmit={handleSubmit}>
    <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="70bbfd_button"
          component={renderCheckBoxField}
          color="#70bbfd"
          className="colored"
        />
      </div>
    </div>
    <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="fa4a86_button"
          component={renderCheckBoxField}
          color="#fa4a86"
          className="colored"
        />
      </div>
    </div>
    <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="f6da6e_button"
          component={renderCheckBoxField}
          color="#f6da6e"
          className="colored"
        />
      </div>
    </div>
    <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="7ed321_button"
          component={renderCheckBoxField}
          color="#7ed321"
          className="colored"
        />
      </div>
    </div>
    <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="b635ba_button"
          component={renderCheckBoxField}
          color="#b635ba"
          className="colored"
        />
      </div>
    </div>
  </form>
);

ButtonTypeControls.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "button_type_controls", // a unique identifier for this form
})(withTranslation("common")(ButtonTypeControls));
