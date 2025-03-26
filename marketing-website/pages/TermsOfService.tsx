import { useRef } from "react";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

const TermsOfService = () => {
  const sections = [
    { id: "introduction", title: "Въведение", number: "1", 
      subsections: [
        { id: "overview", title: "Общ преглед на BrandBoost" },
        { id: "acceptance", title: "Приемане на условията" },
        { id: "modification", title: "Промяна на условията" }
      ]
    },
    { id: "definitions", title: "Дефиниции", number: "2" },
    { id: "eligibility", title: "Допустимост и регистрация", number: "3",
      subsections: [
        { id: "eligibility-criteria", title: "Критерии за допустимост" },
        { id: "account-setup", title: "Създаване на акаунт" },
        { id: "account-security", title: "Сигурност на акаунта" }
      ]
    },
    { id: "services", title: "Описание на услугите", number: "4",
      subsections: [
        { id: "social-content", title: "Създаване на съдържание за социални мрежи" },
        { id: "marketing-strategy", title: "Маркетингова стратегия" },
        { id: "content-planning", title: "Инструменти за стратегия на съдържание" }
      ]
    },
    { id: "obligations", title: "Задължения на потребителя", number: "5" },
    { 
      id: "ip", 
      title: "Интелектуална собственост", 
      number: "6",
      subsections: [
        { id: "our-ip", title: "Нашата интелектуална собственост" },
        { id: "user-content", title: "Съдържание, създадено от потребителя" }
      ]
    },
    { id: "payment", title: "Условия за плащане", number: "7" },
    { id: "liability", title: "Ограничаване на отговорността", number: "8" },
    { id: "disclaimers", title: "Отказ от отговорност", number: "9" },
    { id: "termination", title: "Прекратяване", number: "10" },
    { id: "changes", title: "Промени в условията", number: "11" },
    { id: "governing", title: "Приложимо законодателство", number: "12" },
    { id: "contact", title: "Информация за контакт", number: "13" }
  ];

  return (
    <PolicyLayout 
      title="Общи условия" 
      subtitle="Нашето споразумение с вас при използване на нашите услуги"
      lastUpdated="01.04.2025"
      sections={sections}
    >
      <h2 id="introduction" className="flex items-center text-2xl font-bold">
        <span className="text-blue-600 mr-2">1.</span> Въведение
      </h2>
      
      <h3 id="overview" className="text-xl font-semibold mt-6 mb-3">Общ преглед на BrandBoost</h3>
      <p>
        Добре дошли в BrandBoost, управляван от Бранд Буст ООД (ЕИК: 208213917), компания, регистрирана в България („ние", „нас" или „нашите"). Ние предоставяме услуги за създаване на съдържание за социални мрежи, специално проектирани за коучове, консултанти и създатели на курсове. Нашата платформа предлага решения, които ви помагат да създавате ангажиращо съдържание за социални медии, блогове, имейли и други маркетингови материали.
      </p>
      <p className="mt-3">
        Нашата мисия е да помогнем на коучове и създатели на съдържание да се свържат по-смислено с тяхната аудитория, като предоставяме иновативни инструменти, които подобряват предоставянето на съдържание, персонализацията и ангажираността.
      </p>
      
      <h3 id="acceptance" className="text-xl font-semibold mt-6 mb-3">Приемане на условията</h3>
      <p>
        Чрез достъп или използване на услугите, предоставяни от BrandBoost („Услуги"), вие („Клиент") се съгласявате да бъдете обвързани от тези Общи условия („Условия"). Тези Условия представляват правно обвързващо споразумение между вас и Бранд Буст ООД. Ако използвате Услугите от името на организация, вие декларирате и гарантирате, че имате правомощия да обвържете тази организация с тези Условия.
      </p>
      <p className="mt-3">
        Трябва да сте на поне 18 години и да притежавате правоспособността да сключите обвързващо споразумение, за да използвате нашите Услуги. Ако не сте съгласни с тези Условия, не трябва да получавате достъп до или да използвате нашите Услуги.
      </p>
      
      <h3 id="modification" className="text-xl font-semibold mt-6 mb-3">Промяна на условията</h3>
      <p>
        Запазваме правото да актуализираме или изменяме тези Условия по всяко време по наша собствена преценка. Всички промени влизат в сила веднага след публикуването на редактираните Условия на нашия уебсайт. Ще положим разумни усилия да ви уведомим за всякакви значителни промени, като например изпращане на известие до имейл адреса, свързан с вашия акаунт, или чрез поставяне на видимо известие на нашия уебсайт.
      </p>
      <p className="mt-3">
        Ваша отговорност е да преглеждате периодично тези Условия за евентуални промени. Продължаващото ви използване на Услугите след всякакви изменения означава вашето приемане на ревизираните Условия.
      </p>
      
      <hr className="my-8 border-slate-200" />
      
      <h2 id="definitions" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">2.</span> Дефиниции
      </h2>
      <p>
        За целите на тези Условия се прилагат следните дефиниции:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li><strong>"Бранд Буст ООД"</strong> се отнася до компанията, управляваща BrandBoost, включително нейните дъщерни дружества, филиали, служители, агенти и служители.</li>
        <li><strong>"Услуги"</strong> означава всички продукти и услуги, предоставяни от BrandBoost, включително, но не ограничаващи се до инструменти за създаване на съдържание за социални мрежи, маркетингова стратегия, планиране на стратегия за съдържание и всякакви други услуги, предлагани чрез нашата платформа.</li>
        <li><strong>"Клиент"</strong> се отнася до всяко физическо или юридическо лице, което се регистрира за или използва Услугите, предоставяни от BrandBoost.</li>
        <li><strong>"Съдържание"</strong> включва всички текстове, аудио, видео, изображения, данни и други материали, генерирани, предоставени или направени достъпни чрез Услугите.</li>
        <li><strong>"Потребителски акаунт"</strong> означава регистрирания акаунт, който предоставя на Клиента достъп до нашите Услуги.</li>
      </ul>
      
      <h2 id="eligibility" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">3.</span> Допустимост и регистрация
      </h2>
      <h3 className="text-xl font-semibold mt-6">3.1 Критерии за допустимост</h3>
      <p>
        За да имате право да използвате нашите Услуги, трябва да сте на поне 18 години и да притежавате правоспособността да сключите обвързващо споразумение. Ако използвате нашите Услуги от името на организация, трябва да имате правомощия да обвържете тази организация с тези Условия.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">3.2 Създаване на акаунт</h3>
      <p>
        Когато се регистрирате за акаунт, трябва да предоставите точна, актуална и пълна информация. Вие носите отговорност за поддържане на поверителността на вашите данни за вход в акаунта и за всички дейности, които се извършват под вашия акаунт.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">3.3 Сигурност на акаунта</h3>
      <p>
        Вие носите отговорност за предприемане на всички необходими предпазни мерки, за да гарантирате сигурността на вашия акаунт. Не трябва да споделяте данните си за вход с никого.
      </p>
      
      <h2 id="services" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">4.</span> Описание на услугите
      </h2>
      <h3 className="text-xl font-semibold mt-6">4.1 Създаване на съдържание за социални мрежи</h3>
      <p>
        BrandBoost предоставя инструменти за създаване на съдържание за социални медии, блогове, имейли и други маркетингови материали.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">4.2 Маркетингова стратегия</h3>
      <p>
        BrandBoost предлага разработване на маркетингови стратегии за социални мрежи, съобразени с вашия бранд и специфичните нужди на вашата аудитория.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">4.3 Инструменти за стратегия на съдържание</h3>
      <p>
        BrandBoost предоставя инструменти за планиране и управление на създаване на съдържание за социални медии, блогове, имейли и други маркетингови материали.
      </p>
      
      <h2 id="obligations" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">5.</span> Задължения на потребителя
      </h2>
      <p>Съгласявате се да не:</p>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li>Използвате нашите услуги за незаконни цели или в нарушение на местни, държавни, национални или международни закони</li>
        <li>Нарушавате или посягате на интелектуалната собственост, поверителността, публичността или други законни права на други хора</li>
        <li>Генерирате съдържание, което е вредно, обидно, расово или етнически оскърбително, вулгарно, сексуално експлицитно или по друг начин неприемливо</li>
        <li>Имитирате друго лице или фирма, или неточно представяте вашата връзка с дадено лице или фирма</li>
        <li>Възпрепятствате или нарушавате работата на нашите услуги или сървъри</li>
        <li>Опитвате се да получите неоторизиран достъп до нашите услуги, потребителски акаунти или компютърни системи</li>
      </ul>
      
      <h2 id="ip" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">6.</span> Интелектуална собственост
      </h2>
      <h3 className="text-xl font-semibold mt-6">6.1 Нашата интелектуална собственост</h3>
      <p>
        Нашите услуги и цялото съдържание, функции и функционалност, включително, но не ограничаващи се до текст, графики, лога, икони, изображения, аудио клипове, цифрови изтегляния, компилации на данни, софтуер и дизайна, подбора и подреждането им, са собственост на нас, нашите лицензодатели или други доставчици и са защитени от авторски права, търговски марки и други закони за интелектуална собственост.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">6.2 Съдържание, създадено от потребителя</h3>
      <p>
        Вие запазвате всички права върху съдържанието, което създавате с нашите услуги. Въпреки това, чрез използването на нашите услуги за генериране на съдържание, вие ни предоставяте неизключителен, световен, безплатен лиценз за използване, възпроизвеждане, модифициране, адаптиране, публикуване, превеждане и разпространение на такова съдържание във връзка с предоставянето и подобряването на нашите услуги.
      </p>
      
      <h2 id="payment" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">7.</span> Условия за плащане
      </h2>
      <p>
        Достъпът до определени функции на нашите услуги може да изисква заплащане на такси. Всички такси са в български лева или евро и не подлежат на възстановяване, освен ако това не се изисква от закона или изрично е посочено в тези Условия.
      </p>
      <p className="mt-3">
        Запазваме си правото да променяме нашите цени по всяко време. Ще предоставим уведомление за всякакви промени в цените, като публикуваме новите цени на нашия уебсайт или чрез имейл известие.
      </p>
      
      <h2 id="liability" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">8.</span> Ограничаване на отговорността
      </h2>
      <p>
        До максималната степен, разрешена от закона, ние не носим отговорност за никакви непреки, случайни, специални, последващи или наказателни щети, нито за каквато и да е загуба на печалби или приходи, независимо дали са понесени пряко или косвено, нито за каквато и да е загуба на данни, използване, репутация или други нематериални загуби, произтичащи от:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li>Вашия достъп до или използване на или невъзможност за достъп до или използване на нашите услуги</li>
        <li>Всяко поведение или съдържание на трети страни в нашите услуги</li>
        <li>Всяко съдържание, получено от нашите услуги</li>
        <li>Неоторизиран достъп, използване или промяна на вашите предавания или съдържание</li>
      </ul>
      
      <h2 id="disclaimers" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">9.</span> Отказ от отговорност
      </h2>
      <p>
        Нашите услуги се предоставят "такива, каквито са" и "както са налични" без каквито и да било гаранции от какъвто и да е вид, било то изрични или подразбиращи се, включително, но не ограничаващи се до подразбиращи се гаранции за продаваемост, годност за определена цел или ненарушение.
      </p>
      <p className="mt-3">
        Ние не гарантираме, че нашите услуги ще бъдат непрекъснати или без грешки, че дефектите ще бъдат коригирани или че нашите услуги или сървърите, които ги предоставят, са свободни от вируси или други вредни компоненти.
      </p>
      
      <h2 id="termination" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">10.</span> Прекратяване
      </h2>
      <p>
        Можем да прекратим или да прекъснем достъпа ви до нашите услуги незабавно, без предварително уведомление или отговорност, по всякаква причина, включително, но не ограничаващо се до, ако нарушите тези Условия.
      </p>
      <p className="mt-3">
        При прекратяване вашето право да използвате нашите услуги незабавно ще прекрати. Ако желаете да прекратите акаунта си, може просто да спрете да използвате нашите услуги или да се свържете с нас, за да поискате изтриване на акаунта.
      </p>
      
      <h2 id="changes" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">11.</span> Промени в условията
      </h2>
      <p>
        Запазваме си правото да изменяме или заменяме тези Условия по наша собствена преценка. Ваша отговорност е да проверявате настоящите Условия периодично за промени. Продължаващото използване на нашите услуги след публикуването на всякакви промени в тези Условия означава, че приемате тези промени.
      </p>
      
      <h2 id="governing" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">12.</span> Приложимо законодателство
      </h2>
      <p>
        Тези Условия се уреждат и тълкуват в съответствие със законите на Република България, без оглед на нейните стълкновителни норми.
      </p>
      <p className="mt-3">
        Всички спорове, възникващи от или във връзка с тези Условия, ще бъдат под изключителната юрисдикция на съдилищата, разположени в София, България.
      </p>
      
      <h2 id="contact" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">13.</span> Информация за контакт
      </h2>
      <p>
        Ако имате някакви въпроси относно тези Условия, моля, свържете се с нас на:
      </p>
      <p className="mt-3">
        <strong>Email:</strong> contact@brandboost.bg<br />
        <strong>Телефон:</strong> +359 87 773 7625
      </p>
    </PolicyLayout>
  );
};

export default TermsOfService; 