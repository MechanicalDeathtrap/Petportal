import style from "./my-cabinet.module.sass"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const MyCabinet = () => {
  const imageUrlFromBackend = false
  const isHaveContact = false

  const changePersonalInfo = () => {

  }

  return (
    <section className={style["my-cabinet"]}>
      <div className={style["my-cabinet__my-info"]}>
        <div>
          <div
            className={style["my-cabinet__avatar"]}
            style={{ backgroundImage: `url(${imageUrlFromBackend || '/img/blank-avatar.png'})` }}
          />
          <div className={style["my-cabinet__main-info"]}>
            <h2>Алексей Васильев</h2>
            <span>Россия, Казань</span>
            <p>Зарегистрирован: 29.01.2023</p>
            <p>Проектов выполнено: 4</p>
            <p>Рейтинг: 4,4
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13"
                   fill="none">
                <path
                  d="M5.544 1.11534C5.83312 0.173163 7.16687 0.173161 7.456 1.11534L8.19153 3.51221C8.3204 3.93217 8.70824 4.21885 9.14753 4.21885H11.644C12.5988 4.21885 13.0105 5.42926 12.2537 6.01145L10.1375 7.6394C9.80692 7.89374 9.66891 8.32659 9.79128 8.72537L10.5761 11.2829C10.8619 12.2144 9.78263 12.963 9.01037 12.3689L7.10974 10.9068C6.75027 10.6302 6.24973 10.6302 5.89026 10.9068L3.98963 12.3689C3.21737 12.963 2.13806 12.2144 2.42389 11.2829L3.20872 8.72537C3.33109 8.32659 3.19308 7.89374 2.86245 7.6394L0.746258 6.01145C-0.0105485 5.42926 0.401158 4.21885 1.35599 4.21885H3.85247C4.29176 4.21885 4.6796 3.93217 4.80847 3.51221L5.544 1.11534Z"
                  fill="#F6CD00" />
              </svg>
            </p>
          </div>
        </div>
        <div className={style["my-cabinet__contacts"]}>
          <p>Номер телефона: <br /> <span>{isHaveContact || "Не указано"}</span></p>
          <p>Адрес почты <br /> <span>{isHaveContact || "Не указано"}</span></p>
          <p>Telegram <br /> <span>{isHaveContact || "Не указано"}</span></p>
          <button onClick={changePersonalInfo}>Изменить профиль</button>
        </div>
      </div>
      <div className={style["my-cabinet__about-myself"]}>
        <div>
          <h3>О себе</h3>
          <p>Крутой программист люблю писать код сидеть в маком в кафешке звонить друзьям каждый день делать задачки
            курить айкос ходить на пары получать 50к рисовать гулять играть в настолки путешествовать и просто чилловый
            парень сигма сигма бой сигма бой сигма бой каждая девченка хочет танцевать с тобой</p>
        </div>
        <div>
          <h3>Навыки</h3>
          <p>Python - 3 года - Middle
            Assembler - 2 года - junior</p>
        </div>
      </div>
      <Accordion className={style["my-cabinet__accordion"]}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={style["my-cabinet__accordion-summary"]}
        >
          <Typography component="h3">Образование</Typography>
        </AccordionSummary>
        <AccordionDetails className={style["my-cabinet__accordion-details"]}>
          <Typography>
            <ol>
              <li>Казанский Федеральный университет, Бакалавриат: Программная инжернерия, 2024</li>
              <li>Московский государственный университет, Аспирантура: Прикладная информатика и математика, 2028</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={style["my-cabinet__accordion"]}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={style["my-cabinet__accordion-summary"]}
        >
          <Typography component="h3">Опыт работы</Typography>
        </AccordionSummary>
        <AccordionDetails className={style["my-cabinet__accordion-details"]}>
          <Typography>
            <ol>
              <li>ООО “Апельсинчик”, Программный инженер, 2,5 года</li>
              <li>ООО “Апельсинчик”, Программный инженер, 2,5 года</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </section>
  )
}
