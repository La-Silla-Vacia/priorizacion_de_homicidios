import { h, render } from 'preact';

import s from './base.css';

const data = require('./data.json');

const Base = () => (
  <div className={s.container}>
    <div className={s.row}>
      <h3 className={s.name}>Reinaldo José Gerónimo González</h3>
      <p className={s.summary}>Gerónimo Gonzáles murió en su apartamento con tres disparos. Las causas de su muerte no son claras, pues a los homosexuales del barrio los suelen enamorar para después robarlos, pero a Rey lo mataron sin robarle nada.</p>
      <div className={s.columns}>
        <div className={s.column}>
          <h4 className={s.title}>Impacto</h4>
          Hoi hoi hoi
        </div>
        <div className={s.column}>
          <h4 className={s.title}>Dificultad</h4>
          Hoi hoi hoi
        </div>
        <div className={s.column}>
          <h4 className={s.title}>Estado del proceso</h4>
          Hoi hoi hoi
        </div>
      </div>
    </div>
  </div>
);

export default Base;