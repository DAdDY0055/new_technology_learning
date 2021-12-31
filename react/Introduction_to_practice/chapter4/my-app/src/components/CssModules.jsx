import classes from "../css/CssModules.module.scss";

export const CssModules = () => {
  return (
    <div className={classes.container}>
      <p className={classes.titile}>CSS Modulesです</p>
      <button className={classes.button}>ボタン</button>
    </div>
  );
};
