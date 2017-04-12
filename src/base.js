import { h, render, Component } from 'preact';
import cx from 'classnames';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

import s from './base.css';

const data = require('./data.json');

class Base extends Component {

  getPeople() {
    return data.map((person, index) => {
      return (
        <div className={s.row}>
          <div className={cx(s.column, s.column__big)}>
            <h3 className={s.name}>{person.nombreDeLaVictima}</h3>
            <div className={s.summary}
                 dangerouslySetInnerHTML={{ __html: String(md.render(person.resumenDelHomicidio)) }} />
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <div className={cx(s.status, s[`status__${person.impactoColor}`])}>
            </div>
            <h4 className={s.title}>{ person.impalactoDescripcion }</h4>
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <div className={cx(s.status, s[`status__${person.dificultadColor}`])}>
            </div>
            <h4 className={s.title}>{ person.dificultadDescripcion }</h4>
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <div className={cx(s.status, s[`status__${person.quéTanCercaEstaDeUnaSentencia}`])}>
            </div>
            <h4 className={s.title} >{ person.etapaDelProcesoDescripcion }</h4>
          </div>
        </div>
      )
    })
  }

  render() {
    const people = this.getPeople();

    return (
      <div className={s.container}>
        <div className={cx(s.row, s.heading)}>
          <div className={cx(s.column, s.column__big)}>
            <div className={s.legend}>
              <ul className={s.list}>
                <li>
                  <span className={s.status__1} />
                  Poco
                </li>
                <li>
                  <span className={s.status__2} />
                  Más o menos
                </li>
                <li>
                  <span className={s.status__3} />
                  Muy
                </li>
              </ul>
            </div>
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <h4 className={s.title}>Qué tanto impacto tuvo</h4>
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <h4 className={s.title}>Qué tan difícil era investigarlo</h4>
          </div>
          <div className={cx(s.column, s.statusColumn)}>
            <h4 className={s.title}>Qué tan lejos está de una sentencia</h4>
          </div>
        </div>
        {people}
      </div>
    )
  }
}

export default Base;