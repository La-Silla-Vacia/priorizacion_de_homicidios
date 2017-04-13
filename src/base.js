import { h, render, Component } from 'preact';
import cx from 'classnames';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
// Remember old renderer, if overriden, or proxy to default renderer
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

import s from './base.css';

class Base extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  getPeople() {
    return this.state.data.map((person, index) => {
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

  fetchData() {
    fetch('https://lsv-data-visualizations.firebaseio.com/priorizacionDeHomicidiosLaQueEs.json')
      .then((response) => {
        return response.json()
      }).then((json) => {
      this.setState({data: json});
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render(props, state) {
    const people = this.getPeople();
    let touch = false;
    if (props.meta.is_touch_device) touch = true;

    return (
      <div className={cx(s.container, {[s.touch]: touch})}>
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
                  Mucho/muy
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