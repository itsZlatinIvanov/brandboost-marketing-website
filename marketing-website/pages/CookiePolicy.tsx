import { useRef } from "react";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

const CookiePolicy = () => {
  const sections = [
    { id: "definitions", title: "Дефиниции и обхват", number: "1" },
    { id: "types", title: "Видове бисквитки, които използваме", number: "2",
      subsections: [
        { id: "essential", title: "Съществени бисквитки" },
        { id: "functional", title: "Функционални бисквитки" },
        { id: "performance", title: "Бисквитки за ефективност" },
        { id: "marketing", title: "Маркетингови и рекламни бисквитки" },
        { id: "third-party", title: "Бисквитки на трети страни" }
      ]
    },
    { id: "purpose", title: "Цел на събирането на данни чрез бисквитки", number: "3" },
    { id: "analytics", title: "Бисквитки, използвани за анализ и проследяване на трафика", number: "4" },
    { id: "managing", title: "Управление и деактивиране на бисквитки", number: "5" },
    { id: "consent", title: "Опции за съгласие и контрол", number: "6" },
    { id: "changes", title: "Промени в тази политика", number: "7" },
    { id: "contact", title: "Информация за контакт", number: "8" },
    { id: "additional", title: "Допълнителна информация", number: "9" }
  ];

  return (
    <PolicyLayout 
      title="Политика за бисквитки" 
      subtitle="Нашата политика за бисквитки и как ги използваме"
      lastUpdated="01.04.2024"
      sections={sections}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Въведение</h2>
        <p>
          Тази Политика за бисквитки („Политика") предоставя подробна информация за това как BrandBoost („BrandBoost", „ние", „нас" или „нашите") използва бисквитки и подобни технологии за проследяване на нашия уебсайт https://brandboost.bg и нашата платформа („Сайтът"). Тя обяснява какво представляват бисквитките, как и защо ги използваме и какви избори имате относно тяхното използване.
        </p>
      </div>

      <h2 id="definitions" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">1.</span> Дефиниции и обхват
      </h2>
      <p className="mb-6">
        Бисквитките са малки файлове с данни, които се съхраняват на вашето устройство (напр. компютър, таблет, смартфон), когато посещавате даден уебсайт. Те се използват широко, за да позволят основни функционалности, да подобрят потребителското изживяване и да събират информация за използването. Тази Политика се прилага за всички посетители и потребители на сайта и платформата на BrandBoost.
      </p>

      <h2 id="types" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">2.</span> Видове бисквитки, които използваме
      </h2>
      <p className="mb-6">
        Използваме следните категории бисквитки на нашия Сайт:
      </p>

      <h3 id="essential" className="text-xl font-semibold mt-6 mb-3">Съществени бисквитки</h3>
      <p>
        <strong>Описание:</strong> Тези бисквитки са необходими за основната функционалност и сигурност на нашия Сайт. Без тях, услугите, които сте поискали, като влизане в профила или извършване на сигурно плащане, не могат да бъдат предоставени.
      </p>
      <p className="mt-2">
        <strong>Функционалност:</strong> Съществените бисквитки позволяват основната функционалност на Сайта, като протоколи за сигурност, управление на мрежата и достъпност.
      </p>
      <p className="mt-2">
        <strong>Примери:</strong> Бисквитки за удостоверяване, използвани за улесняване на опциите за единен вход (SSO), включително вход чрез Google и Facebook, и бисквитки за сигурност за предотвратяване на измами.
      </p>

      <h3 id="functional" className="text-xl font-semibold mt-6 mb-3">Функционални бисквитки</h3>
      <p>
        <strong>Описание:</strong> Тези бисквитки позволяват на Сайта да предоставя подобрена функционалност и персонализация въз основа на потребителските взаимодействия.
      </p>
      <p className="mt-2">
        <strong>Функционалност:</strong> Функционалните бисквитки запомнят избори, които правите, като например предпочитания за език и персонализирани настройки, за да оптимизирате вашето потребителско изживяване.
      </p>
      <p className="mt-2">
        <strong>Примери:</strong> Бисквитки, които запомнят предпочитания като предпочитан език, състояния на вход за удобство на потребителя и опции за персонализация.
      </p>

      <h3 id="performance" className="text-xl font-semibold mt-6 mb-3">Бисквитки за ефективност</h3>
      <p>
        <strong>Описание:</strong> Тези бисквитки ни помагат да разберем потребителските взаимодействия на Сайта, като събират анонимизирана информация. Те ни позволяват да проследяваме посещенията на страниците, да анализираме тенденциите и да вземаме решения, базирани на данни, за подобряване на ефективността.
      </p>
      <p className="mt-2">
        <strong>Функционалност:</strong> Бисквитките за ефективност ни дават възможност да измерваме и подобряваме ефективността на нашия Сайт, да идентифицираме пътеките за навигация на потребителите и да подобряваме потребителското изживяване.
      </p>
      <p className="mt-2">
        <strong>Примери:</strong> Бисквитки на Google Analytics, които събират данни за преглежданите страници, средната продължителност на сесиите и други показатели, без да идентифицират лично посетителите.
      </p>

      <h3 id="marketing" className="text-xl font-semibold mt-6 mb-3">Маркетингови и рекламни бисквитки</h3>
      <p>
        <strong>Описание:</strong> Маркетинговите бисквитки се използват за доставяне на релевантно рекламно съдържание на потребителите, както и за ограничаване на броя на показванията на дадена реклама.
      </p>
      <p className="mt-2">
        <strong>Функционалност:</strong> Тези бисквитки проследяват посетителите на уебсайтове и съставят профил въз основа на историята на сърфиране, за да показват релевантни реклами.
      </p>
      <p className="mt-2">
        <strong>Примери:</strong> Рекламни мрежи на трети страни, които използват бисквитки за проследяване на активността на потребителите и показване на целеви реклами.
      </p>

      <h3 id="third-party" className="text-xl font-semibold mt-6 mb-3">Бисквитки на трети страни</h3>
      <p>
        <strong>Описание:</strong> Тези бисквитки се поставят от услуги на трети страни, които се появяват на нашия Сайт и ни помагат да предоставяме определени функции и функционалности. Бисквитките на трети страни могат да събират и проследяват информация на и извън нашия Сайт.
      </p>
      <p className="mt-2">
        <strong>Функционалност:</strong> BrandBoost партнира с доставчици на услуги от трети страни, като например Stripe за обработка на плащания, и използва тези бисквитки за проследяване на информация за транзакциите.
      </p>
      <p className="mt-2">
        <strong>Примери:</strong> Бисквитки, използвани от Stripe за сигурна обработка на плащания и проследяване на историята на транзакциите.
      </p>

      <h2 id="purpose" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">3.</span> Цел на събирането на данни чрез бисквитки
      </h2>
      <p className="mb-6">
        Използваме бисквитки, за да:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Предоставяме сигурно, функционално и лесно за използване изживяване на Сайта.</li>
        <li>Проследяваме и анализираме активността на потребителите, за да разбираме предпочитанията на посетителите и да оптимизираме съдържанието.</li>
        <li>Доставяме персонализирано маркетингово съдържание и реклами на потребителите.</li>
        <li>Улесняваме сигурни и безпроблемни транзакции чрез интеграция за плащания на Stripe.</li>
        <li>Поддържаме ефективността, сигурността и интегритета на Сайта.</li>
      </ul>

      <h2 id="analytics" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">4.</span> Бисквитки, използвани за анализ и проследяване на трафика
      </h2>
      <p className="mb-6">
        Нашият Сайт използва аналитични бисквитки, предоставени от Google Analytics и други услуги за проследяване, за да събираме информация за използването на уебсайта. Тези бисквитки ни помагат да:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Разбираме как потребителите взаимодействат със Сайта.</li>
        <li>Следим потока на потребителите, продължителността на сесиите и посетените страници.</li>
        <li>Оценяваме цялостната ефективност на Сайта и ангажираността на потребителите.</li>
      </ul>
      <p className="mt-4">
        Аналитичните бисквитки събират само агрегирани данни, а самоличността на потребителите остава анонимна, освен ако не е посочено друго.
      </p>

      <h2 id="managing" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">5.</span> Управление и деактивиране на бисквитки
      </h2>
      <p className="mb-6">
        Имате възможността да управлявате или деактивирате бисквитки чрез настройките на вашия уеб браузър. Моля, имайте предвид, че деактивирането на бисквитки може да засегне функционалността и ефективността на нашия Сайт. За по-подробна информация относно управлението на бисквитки и отказването от определени опции за проследяване, моля, използвайте следните ресурси:
      </p>
      <h4 className="text-lg font-medium mt-4 mb-2">Инструкции за управление на бисквитки в браузъра:</h4>
      <p>
        Научете как да управлявате и деактивирате бисквитки в популярни браузъри:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
      </ul>
      <h4 className="text-lg font-medium mt-4 mb-2">Отказ от Google Analytics:</h4>
      <p>
        Ако искате да се откажете от проследяването на Google Analytics, можете да изтеглите и инсталирате <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">добавката за отказ от Google Analytics за браузъра</a>.
      </p>
      <h4 className="text-lg font-medium mt-4 mb-2">Информация за отказ от рекламни мрежи на трети страни:</h4>
      <p>
        За целеви реклами, можете също да посетите следните сайтове, за да коригирате вашите предпочитания или да се откажете от проследяване на реклами от различни мрежи:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><a href="https://optout.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative (NAI) Opt-Out</a></li>
        <li><a href="https://optout.aboutads.info/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA) Opt-Out</a></li>
        <li><a href="https://www.youronlinechoices.eu/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance (EDAA) Opt-Out for EU Users</a></li>
      </ul>

      <h2 id="consent" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">6.</span> Опции за съгласие и контрол
      </h2>
      <p className="mb-6">
        При първо посещение ще се появи банер за бисквитки, за да получи вашето съгласие за нетехнически бисквитки. Можете да оттеглите или коригирате вашите предпочитания за съгласие по всяко време, като кликнете върху връзката за настройки на бисквитките, разположена в долната част на нашия Сайт, или чрез управление на настройките чрез вашия браузър.
      </p>

      <h2 id="changes" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">7.</span> Промени в тази политика
      </h2>
      <p className="mb-6">
        BrandBoost си запазва правото да актуализира тази Политика за бисквитки, за да отразява промени в нашите практики или съответни закони. Препоръчваме ви да преглеждате тази Политика периодично, за да бъдете информирани за това как управляваме бисквитките.
      </p>

      <h2 id="contact" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">8.</span> Информация за контакт
      </h2>
      <p className="mb-6">
        За въпроси или притеснения относно нашата Политика за бисквитки, моля, свържете се с нас на:
      </p>
      <p>
        <strong>Имейл:</strong> contact@brandboost.bg<br />
        <strong>Телефон:</strong> +359 87 773 7625
      </p>

      <h2 id="additional" className="flex items-center text-2xl font-bold mt-12">
        <span className="text-blue-600 mr-2">9.</span> Допълнителна информация
      </h2>
      <p className="mb-2">
        <strong>Правно съответствие:</strong> Нашите практики за бисквитки съответстват на GDPR и други съответни разпоредби.
      </p>
      <p className="mb-6">
        <strong>Права за данните на потребителите:</strong> Потребителите имат права за достъп, изтриване или ограничаване на обработката на личните им данни, събрани чрез бисквитки, както е описано в нашата <a href="/privacy-policy" className="text-blue-600 hover:underline">Политика за поверителност</a>.
      </p>
    </PolicyLayout>
  );
};

export default CookiePolicy; 