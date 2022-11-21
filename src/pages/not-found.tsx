import React from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export function NotFound404() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text text_type_main-large">Страница потерялась...</h1>
          <p className="text text_type_main-default pt-15">Запрашиваемая Вами страница, скорее всего, когда-то была здесь,</p>
          <p className="text text_type_main-default pt-2">но, к сожалению, сейчас её здесь нет</p>
          <p className="text text_type_main-default pt-15">проверьте адрес или вернитесь <Link to='/' className={styles.link}>домой</Link></p>
        </div>
      </div>
    </div>
  );
}
