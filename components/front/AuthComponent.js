/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React,{useState} from 'react';
import {useRouter} from 'next/router';
import { connect, useDispatch } from "react-redux"
import { authenticateAction } from '../../redux/actions/authenticateAction';
import styles from "../../styles/AuthComponent.module.css"

function AuthComponent({authentication_state}) {
  const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (event) => {
      event.preventDefault();
        if ((userId === 'etflogin' && password === 'vi0L3t0rch1d$') || (userId === 'testguest' && password === 'NbPlants@Year3')){
            dispatch(authenticateAction(true)).then(() => {
              router.push("/home");
            });
        } else {
            router.push("/");
        }
    };
    if (!authentication_state){
        return(
            <div className={[styles.loginContainer].join(" ")}>
                <h2 className={[styles.loginTitle, "text-center", "mt-4"].join(" ")}>NB Plants Login Page</h2>
                <div className={[styles.formSection, "form-section"].join(" ")}>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={[styles.formControl, "form-control", "mb-3"].join(" ")}
                        aria-describedby="username"
                        placeholder="Username"
                        value={userId}
                onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={[styles.formControl, "form-control", "mb-3"].join(" ")}
                        placeholder="Password"
                        value={password}
                onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className={["submitBtn", styles.btn, styles.btnSuccess, "btn", "btn-success"].join(" ")}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
        );
    }

    return authentication_state;
}

const mapStateToProps = (state) => ({
    authentication_state: state.authenticate.authentication_state
  })

export default connect(mapStateToProps)(AuthComponent);