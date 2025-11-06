'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '../components/context/LanguageContext'
import Translator from '../components/commonComponents/Translator';



export default function AboutPageContent() {
  const { language } = useLanguage()
    useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import Bootstrap JS
      import("bootstrap/dist/js/bootstrap.bundle.min.js");

      // Initialize AOS animations
      AOS.init({ duration: 1000 });
    }
  }, []);

  return (
    <>
      <header className="shadow-sm">
        <div className="banner">
          <div className="text-center py-5">
            <h1 className="display-4 text-white fw-bold"><Translator text='About Us'  targetLang={language}/></h1>
            <p className="lead text-white"><Translator text='Explore Maharashtra'  targetLang={language}/></p>
          </div>
        </div>
      </header>

      <section className="container py-5">
        <div className="home text-center">
          <h2 className="section-title mt-2 mb-4"><Translator text='Overview' targetLang={language}/></h2>
          <p>
            <Translator text='Explore Maharashtra is your trusted travel companion, dedicated to showcasing the rich cultural
            heritage, natural beauty, and historic wonders of Maharashtra. From tranquil beaches and majestic
            forts to verdant hill stations and sacred temples, our mission is to help travelers experience every
            corner of this vibrant state.'  targetLang={language}/>
          </p>
          <p>
            <Translator text='Whether you&apos;re a weekend explorer, a history buff, or a nature lover, our platform offers
            in-depth insights, travel guides, and local tips to make your journey unforgettable.'  targetLang={language}/>
          </p>
          <p>
            <Translator text='Join us in discovering the real Maharashtra &mdash; beyond the tourist brochures.'  targetLang={language}/>
          </p>

        <h2 className="section-title mt-5 mb-0"><Translator text='Journey Through Maharashtra - Timeline'  targetLang={language}/></h2>
        <div className="timeline-container mt-0">
          <div className="timeline-line"></div>

          {timelineItems.map((item, i) => (
            <div
              key={i}
              className={`timeline-row ${i % 2 === 0 ? 'odd' : 'even'} timeline-hover`}
            >
              <div className="timeline-year" data-aos="fade-down">
                <Translator text={item.year}  targetLang={language}/>
              </div>
              <div
                className="timeline-content"
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay="600"
              >
                <h4><Translator text={item.title} targetLang={language}/></h4>
                <p><Translator text={item.description} targetLang={language}/></p>
                <button
                  type="button"
                  className={`btn ${item.btnClass || 'btn-outline-dark'} view-more-btn`}
                  data-bs-toggle="modal"
                  data-bs-target={item.modalId}
                >
                  <Translator text='View More' targetLang={language}/>
                </button>
              </div>
            </div>
          ))}

        </div>
        </div>
          {modals.map((modal, idx) => (
            <div
              key={idx}
              className="modal fade"
              id={modal.id.replace('#', '')}
              // tabIndex="-1"
              aria-labelledby={`${modal.id.replace('#', '')}Label`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content border-0 shadow-lg">
                  <div className="modal-header bg-warning-subtle border-0">
                    <h5
                      className="modal-title fw-bold text-dark"
                      id={`${modal.id.replace('#', '')}Label`}
                    >
                      <Translator text={modal.title} targetLang={language}/>
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body px-4 py-4">
                    <div dangerouslySetInnerHTML={{ __html: modal.content }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}


const timelineItems = [
  {
    "year": "2nd BCE",
    "title": "Ancient Maharashtra",
    "description": "Ajanta & Ellora Caves carved \u2013 symbols of ancient Indian art and Buddhism.",
    "modalId": "#ancientModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "8th\u201313th",
    "title": "Yadava & Chalukya Era",
    "description": "Flourishing of Hindu temples, literature, and trade in the Deccan region.",
    "modalId": "#yadavaModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "17th",
    "title": "Maratha Empire",
    "description": "Chhatrapati Shivaji Maharaj established forts and unified Maratha pride.",
    "modalId": "#marathaModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "1818",
    "title": "British Rule",
    "description": "After defeat of Marathas, Maharashtra became part of the Bombay Presidency.",
    "modalId": "#britishModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "1947",
    "title": "Independence",
    "description": "Maharashtra played a key role in the Quit India Movement and freedom fight.",
    "modalId": "#independenceModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "1960",
    "title": "State Formation",
    "description": "Maharashtra was officially formed on May 1st, 1960.",
    "modalId": "#formationModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "1980s",
    "title": "Industrial Boom",
    "description": "Mumbai rose as India\u2019s financial capital with booming industries.",
    "modalId": "#industrialModal",
    "btnClass": "btn-outline-dark"
  },
  {
    "year": "2000s",
    "title": "Tourism Growth",
    "description": "Maharashtra became a tourism hotspot with heritage and eco-tourism growth.",
    "modalId": "#tourismModal",
    "btnClass": "btn-outline-dark"
  }
]
const modals = [
  {
    id: '#ancientModal',
    title: '🕰️ Ancient Maharashtra (2nd Century BCE)',
    content: `
  <h4 class='text-primary fw-semibold mb-3'>Cradle of Civilization, Culture, and Craftsmanship</h4>
  <p>
    Ancient Maharashtra holds a distinguished place in India’s rich tapestry of history. Dating back to around the 2nd century BCE, this land was a flourishing hub of spirituality, trade, and art. The period marked the rise of powerful dynasties like the Satavahanas, who governed vast parts of the Deccan region and played a crucial role in uniting fragmented territories under a centralized administration.
  </p>

  <h5 class='text-success mt-4'>🌄 Ajanta & Ellora Caves – Timeless Testaments of Art</h5>
  <p>
    Among the most iconic legacies of this era are the Ajanta and Ellora Caves, carved meticulously into the Sahyadri hills. These stunning rock-cut monuments are more than just tourist attractions—they are enduring symbols of India&apos;s spiritual and artistic excellence.
  </p>
  <ul>
    <li><strong>Ajanta Caves (2nd BCE to 6th CE):</strong> Mostly Buddhist, these caves showcase serene sculptures and breathtaking murals that depict the life of Gautam Buddha and Jataka tales.</li>
    <li><strong>Ellora Caves (6th to 10th CE):</strong> A harmonious confluence of Buddhist, Hindu, and Jain faiths, they represent India’s cultural tolerance and architectural grandeur.</li>
  </ul>

  <h5 class='text-danger mt-4'>🛕 A Melting Pot of Faith and Philosophy</h5>
  <p>
    During this era, Maharashtra was a sanctuary for diverse religious traditions. Buddhism thrived, attracting scholars and monks from across Asia. The caves served as monasteries, universities, and pilgrimage centers, influencing thought and culture across the subcontinent.
  </p>
  <p>
    At the same time, early Hindu traditions began to take root, particularly through the influence of Shaivism and Vaishnavism. The spiritual energy of the region shaped its social fabric for centuries to come.
  </p>

  <h5 class='text-info mt-4'>🛤️ Trade and Prosperity</h5>
  <p>
    Ancient Maharashtra wasn’t just a spiritual destination—it was also a thriving commercial hub. Trade routes connected it to ancient Persia, Mesopotamia, Egypt, and even the Roman Empire. Goods such as spices, textiles, and precious stones were exchanged, leading to economic prosperity and cultural fusion.
  </p>
  <p>
    Ports like <strong>Sopara</strong> (present-day Nala Sopara) served as vital gateways to the western world, while <strong>Paithan</strong> (Pratishthana) on the Godavari River became a celebrated city for its trade and scholarship.
  </p>

  <h5 class='text-dark mt-4'>🏛️ Legacy and Influence</h5>
  <p>
    The legacy of ancient Maharashtra laid the foundation for centuries of innovation and resilience. Its values of pluralism, creativity, and devotion continue to resonate through its temples, festivals, and people.
  </p>
  <p>
    From stone to soul, the stories of this time remain etched in its monuments and memories—offering a profound glimpse into a civilization that shaped not just Maharashtra, but the spiritual and cultural identity of India itself.
  </p>
`

  },
  {
          id: 'yadavaModal',
          title: '🛡️ Yadava & Chalukya Era (8th to 13th Century CE)',
          label: 'yadavaModalLabel',
          headerClass: 'bg-warning-subtle',
          content: `
           <h4 class="text-primary fw-semibold mb-3">Dynasties of Power, Temple Architecture, and Cultural Flourishing</h4>
        <p>
          The period between the 8th and 13th centuries witnessed the rise of the **Chalukyas of Badami** and later the **Yadava dynasty of Devagiri**—two major powers that left a profound mark on Maharashtra’s political and cultural landscape.
        </p>

        <h5 class="text-success mt-4">🏯 Chalukyas – Masters of Temple Art</h5>
        <p>
          The **Chalukyas** were renowned for their architectural innovation and patronage of art. They constructed stunning temples in **Pattadakal, Aihole**, and **Badami**, blending Nagara and Dravidian styles. Though centered in present-day Karnataka, their influence extended into Maharashtra, promoting Sanskrit learning, sculpture, and religious harmony.
        </p>
        <ul>
          <li>Supported Shaivism, Vaishnavism, and Jainism simultaneously.</li>
          <li>Encouraged rock-cut temples and inscriptional records in Sanskrit and Kannada.</li>
        </ul>

        <h5 class="text-warning mt-4">🦁 Yadavas of Devagiri – Builders of Forts and Cities</h5>
        <p>
          The **Yadava dynasty**, with its capital at **Devagiri (now Daulatabad)**, played a key role in the development of medieval Maharashtra. Their reign marked a shift towards local autonomy and the rise of Marathi as a language of administration and literature.
        </p>
        <ul>
          <li><strong>Bhaskaracharya</strong>, the famed mathematician and astronomer, flourished during this era.</li>
          <li>Built **fortifications, stepwells, and temples** across the Deccan.</li>
          <li>Promoted **agriculture, irrigation**, and local crafts.</li>
        </ul>

        <h5 class="text-danger mt-4">📚 Cultural & Linguistic Growth</h5>
        <p>
          Both dynasties patronized scholars, poets, and saints. This era laid the groundwork for **Marathi literature**, as inscriptions and poetry began appearing in the local tongue. The rise of **Bhakti movements** can be traced back to this time, sowing seeds for the later spiritual renaissance of Maharashtra.
        </p>

        <h5 class="text-info mt-4">🛤️ Trade and Urban Centers</h5>
        <p>
          The Deccan region prospered under both dynasties due to its strategic location. Trade routes from Gujarat, Konkan, and the southern peninsula converged in cities like **Paithan**, **Devagiri**, and **Kolhapur**, enabling a vibrant exchange of goods, ideas, and cultures.
        </p>

        <h5 class="text-dark mt-4">🏛️ Legacy and Continuity</h5>
        <p>
          The Chalukyas and Yadavas built a strong socio-political foundation that enabled the rise of the **Maratha Empire** later. Their emphasis on temple-building, language, and administration helped shape the cultural identity of Maharashtra that persists to this day.
        </p>
        <p>
          Forts, temples, and inscriptions from this era stand as silent storytellers—echoes of a time when kings ruled not just by might, but by culture and wisdom.
        </p>`,
        },
        {
          id: 'marathaModal',
          title: '⚔️ Maratha Empire (17th to 18th Century CE)',
          label: 'marathaModalLabel',
          headerClass: 'bg-danger-subtle',
          content: `<h4 class="text-danger fw-semibold mb-3">Rise of Swarajya, Forts, and Cultural Unity</h4>
        
        <p>
          The **Maratha Empire**, founded in the 17th century under the visionary leadership of **Chhatrapati Shivaji Maharaj**, reshaped India’s political destiny. Emerging from the rugged hills of the Western Ghats, the Marathas established one of the most resilient and dynamic empires in Indian history—based on principles of **Swarajya** (self-rule), justice, and efficient governance.
        </p>

        <h5 class="text-primary mt-4">🗡️ Chhatrapati Shivaji Maharaj – The Architect of Maratha Power</h5>
        <p>
          Shivaji Maharaj revolutionized warfare by emphasizing **guerilla tactics**, strongholds in the **Sahyadri forts**, and swift cavalry raids. His leadership wasn't just military—it was deeply rooted in values of **people-centric governance, tolerance, and inclusivity**.
        </p>
        <ul>
          <li>Coronation at **Raigad Fort** in 1674 marked the formal beginning of the Maratha Empire.</li>
          <li>Established **Ashta Pradhan Mandal** (council of ministers) for decentralized governance.</li>
          <li>Built and controlled over **350 forts**, including Rajgad, Raigad, Pratapgad, and Sinhagad.</li>
        </ul>

        <h5 class="text-success mt-4">🏰 Forts – Pillars of Swarajya</h5>
        <p>
          The Maratha forts were more than military bases—they were **symbols of freedom and resilience**. Each fort was self-sustained and strategically located to monitor trade and enemy movements.
        </p>

        <h5 class="text-warning mt-4">🛡️ Expansion under the Peshwas</h5>
        <p>
          After Shivaji, the **Peshwas** (prime ministers) led the Maratha Empire to its zenith. The Maratha influence stretched from **Attock in the north to Thanjavur in the south**, covering vast parts of the Indian subcontinent.
        </p>
        <ul>
          <li>**Baji Rao I** – A military genius who never lost a battle.</li>
          <li>Established Pune as the administrative capital.</li>
          <li>Promoted arts, education, and Sanskrit scholarship.</li>
        </ul>

        <h5 class="text-info mt-4">📜 Cultural Renaissance</h5>
        <p>
          The Maratha era witnessed a **revival of Marathi literature**, Bhakti poetry, and temple architecture. Saints like **Samarth Ramdas**, **Tukaram**, and **Namdev** inspired spiritual and social reform movements.
        </p>

        <h5 class="text-secondary mt-4">⚖️ Administration & Economy</h5>
        <p>
          The empire introduced **revenue reforms**, efficient land records, and a **well-organized judicial system**. The economy flourished through agriculture, inland trade, and coinage systems.
        </p>

        <h5 class="text-dark mt-4">💥 Legacy of the Marathas</h5>
        <p>
          Despite the decline after the **Third Battle of Panipat (1761)** and later British dominance, the Maratha legacy remains unmatched. Their contribution to **India’s independence spirit, cultural identity, and regional pride** lives on through the forts, festivals, and folktales of Maharashtra.
        </p>
        <p>
          The slogan **"Jai Bhavani, Jai Shivaji"** still echoes through Maharashtra as a call to courage, justice, and unity.
        </p>`,
        },
        {
          id: 'britishModal',
          title: '🇬🇧 British Colonial Period (1818 – 1947)',
          label: 'britishModalLabel',
          headerClass: 'bg-secondary-subtle',
          content: `<h4 class="text-secondary fw-semibold mb-3">Struggles, Reforms, and Rise of National Consciousness</h4>

        <p>
          After the fall of the Maratha Empire in **1818**, Maharashtra came under **British East India Company** rule, later becoming part of British India. Despite oppression, this era sparked an awakening of **political, educational, and social reform movements** that fueled India’s freedom struggle.
        </p>

        <h5 class="text-danger mt-4">✊ Freedom Fighters and Movements</h5>
        <ul>
          <li>**Bal Gangadhar Tilak**: Known as the *Father of Indian Unrest*, he ignited nationalism with the slogan "Swaraj is my birthright".</li>
          <li>**Gopal Krishna Gokhale**: A moderate reformer and mentor to Mahatma Gandhi.</li>
          <li>Revolutionary activities emerged in cities like Pune and Mumbai.</li>
        </ul>

        <h5 class="text-primary mt-4">📚 Educational and Social Reforms</h5>
        <ul>
          <li>**Jyotirao Phule** and **Savitribai Phule** pioneered education for girls and the lower castes.</li>
          <li>**Dr. B.R. Ambedkar** fought caste discrimination and laid the foundation for India’s constitutional vision.</li>
          <li>Modern institutions like **Fergusson College**, **Bombay University**, and **Deccan College** were established.</li>
        </ul>

        <h5 class="text-success mt-4">🏙️ Industrial and Urban Development</h5>
        <p>
          Mumbai became a major **port and textile hub**, while railways, telegraph lines, and mills transformed urban Maharashtra.
        </p>

        <h5 class="text-dark mt-4">🕊️ Towards Independence</h5>
        <p>
          From **non-cooperation and civil disobedience** to the **Quit India Movement**, Maharashtra remained a stronghold of patriotic zeal. The efforts of reformers, revolutionaries, and common citizens paved the way for independence in **1947**.
        </p>`,
        },
        {
          id: 'independenceModal',
          title: '🇮🇳 Independence Movement (1930 – 1947)',
          label: 'independenceModalLabel',
          headerClass: 'bg-primary-subtle',
          content: `<h4 class="text-primary fw-semibold mb-3">Maharashtra’s Role in India’s Fight for Freedom</h4>

        <p>
          Maharashtra stood at the forefront of India’s **Independence Movement**, producing iconic leaders, fearless revolutionaries, and mass movements that challenged British rule. From the **Civil Disobedience Movement** to the **Quit India Movement**, the spirit of freedom was deeply rooted in the people of this land.
        </p>

        <h5 class="text-danger mt-4">✊ Brave Freedom Fighters</h5>
        <ul>
          <li><strong>Bal Gangadhar Tilak</strong> – Laid the intellectual and emotional foundation of Indian nationalism. "Swaraj is my birthright, and I shall have it!" became a national slogan.</li>
          <li><strong>Vinayak Damodar Savarkar</strong> – A revolutionary thinker and writer who inspired armed resistance against colonialism.</li>
          <li><strong>Gopal Krishna Gokhale</strong> – A moderate nationalist and mentor to Mahatma Gandhi.</li>
          <li><strong>Senapati Bapat</strong> – Known for his role in revolutionary activities and the Mulshi Satyagraha.</li>
        </ul>

        <h5 class="text-success mt-4">🚩 Major Movements</h5>
        <ul>
          <li><strong>Civil Disobedience Movement (1930)</strong>: Maharashtra saw mass participation in salt satyagrahas, boycotts of foreign goods, and protests.</li>
          <li><strong>Quit India Movement (1942)</strong>: Launched from Mumbai’s Gowalia Tank Maidan by Mahatma Gandhi, this became a turning point in the struggle. Protests, strikes, and uprisings shook the British rule across the state.</li>
        </ul>

        <h5 class="text-warning mt-4">📚 Role of Education & Press</h5>
        <p>
          Maharashtra’s reformers and intellectuals used newspapers, pamphlets, and public speeches to awaken national consciousness. Publications like <em>Kesari</em> and <em>Maratha</em> were powerful tools of resistance.
        </p>

        <h5 class="text-info mt-4">🏙️ Urban Centers of Resistance</h5>
        <p>
          <strong>Mumbai</strong> became the political nerve center with mass protests, labor strikes, and nationalist rallies. Cities like Pune, Nashik, and Nagpur became hotbeds of revolutionary action and intellectual dissent.
        </p>

        <h5 class="text-dark mt-4">🕊️ Legacy of Freedom</h5>
        <p>
          The courage and sacrifices of Maharashtra’s freedom fighters remain deeply etched in history. Their legacy continues to inspire generations to stand for justice, democracy, and unity.
        </p>
        <p>
          On **15th August 1947**, when India finally broke free from British rule, Maharashtra stood proud—having played a vital role in achieving **Swarajya**.
        </p>...
          `,
        },
        {
          id: 'formationModal',
          title: '🏛️ State Formation (1960)',
          label: 'formationModalLabel',
          headerClass: 'bg-warning-subtle',
          content: `        <h4 class="text-warning fw-semibold mb-3">Birth of Maharashtra – A Milestone in India&apos;s Linguistic Reorganization</h4>

        <p>
          On **May 1st, 1960**, the state of **Maharashtra** was officially formed, marking a historic achievement in the Indian subcontinent’s journey toward recognizing **linguistic identity and cultural pride**.
        </p>

        <h5 class="text-danger mt-4">🗣️ The Samyukta Maharashtra Movement</h5>
        <p>
          After India’s independence in 1947, there was a strong demand to reorganize states on linguistic lines. The **Samyukta Maharashtra Movement** emerged to advocate for a Marathi-speaking state that included Mumbai (then Bombay), Vidarbha, and Marathwada.
        </p>
        <ul>
          <li><strong>Launched in 1956</strong>, it was a mass civil movement supported by students, workers, farmers, and intellectuals.</li>
          <li>Key organizations like the <em>Samyukta Maharashtra Samiti</em> played a pivotal role in mobilizing public opinion.</li>
          <li>The movement witnessed massive protests, public meetings, and even martyrdom of over 100 protestors in police firing.</li>
        </ul>

        <h5 class="text-success mt-4">🏙️ Mumbai: The Heart of the Struggle</h5>
        <p>
          A major point of contention was the inclusion of **Mumbai** in the new state. Despite resistance from other groups, the people’s movement ensured that **Mumbai became the capital** of the newly formed Maharashtra state.
        </p>

        <h5 class="text-primary mt-4">🗓️ May 1 – Maharashtra Day</h5>
        <p>
          The success of the movement culminated on **May 1, 1960**, when the Bombay State was split into two: **Gujarat** (for Gujarati speakers) and **Maharashtra** (for Marathi speakers).
        </p>
        <p>
          Since then, **Maharashtra Day** is celebrated annually with parades, tributes, and cultural events that honor the sacrifices made during the formation struggle.
        </p>

        <h5 class="text-secondary mt-4">🌾 Legacy of Unity and Progress</h5>
        <p>
          The formation of Maharashtra paved the way for the state to emerge as a powerhouse in **industry, agriculture, culture, and education**. Today, it is home to **India’s financial capital**, Mumbai, and continues to lead the nation in economic and cultural spheres.
        </p>

        <p class="fw-bold mt-4">
          Maharashtra&apos;s formation is not just a political milestone—it&apos;s a symbol of people’s will, cultural pride, and democratic strength.
        </p>
`,
        },
        {
          id: 'industrialModal',
          title: '🏭 Industrial Boom (1980s)',
          label: 'industrialModalLabel',
          headerClass: 'bg-info-subtle',
          content: `<h4 class="text-info fw-semibold mb-3">The Rise of Maharashtra as India’s Economic Powerhouse</h4>

        <p>
          The **1980s** marked a transformative era for Maharashtra, especially Mumbai, as it evolved into **India’s undisputed financial and industrial capital**. This period was characterized by rapid economic development, infrastructural growth, and the rise of powerful industries that propelled the state&apos;s economy to national prominence.
        </p>

        <h5 class="text-dark mt-4">🏢 Mumbai – The Financial Engine</h5>
        <p>
          Mumbai became the epicenter of India’s financial activities. With institutions like:
        </p>
        <ul>
          <li>Reserve Bank of India (RBI)</li>
          <li>Bombay Stock Exchange (BSE)</li>
          <li>National Stock Exchange (NSE)</li>
        </ul>
        <p>
          The city attracted global investment and talent, driving a boom in sectors like banking, finance, and real estate.
        </p>

        <h5 class="text-success mt-4">🏭 Growth of Major Industries</h5>
        <p>
          Maharashtra saw a rapid increase in industrial activity across regions:
        </p>
        <ul>
          <li><strong>Pune:</strong> Automotive and manufacturing hub (Tata, Bajaj, Kirloskar)</li>
          <li><strong>Nashik:</strong> Electrical equipment and defense production</li>
          <li><strong>Aurangabad:</strong> Pharmaceuticals and consumer goods</li>
          <li><strong>Thane & Navi Mumbai:</strong> Petrochemicals and infrastructure development</li>
        </ul>

        <h5 class="text-primary mt-4">⚙️ Infrastructure and Connectivity</h5>
        <p>
          During this time, Maharashtra invested heavily in building road networks, industrial belts, ports, and rail connectivity:
        </p>
        <ul>
          <li><strong>Jawaharlal Nehru Port Trust (JNPT)</strong> – India’s largest container port</li>
          <li>Development of MIDC (Maharashtra Industrial Development Corporation) zones</li>
          <li>Expansion of Mumbai’s suburban railway network</li>
        </ul>

        <h5 class="text-warning mt-4">💼 Employment & Migration</h5>
        <p>
          The boom led to massive employment opportunities, attracting **skilled and unskilled workers** from across the country. This migration fueled Mumbai’s multicultural fabric and expanded the middle class.
        </p>

        <h5 class="text-secondary mt-4">🎬 Media & Bollywood Expansion</h5>
        <p>
          Parallel to industrial growth, **Bollywood** (Hindi film industry) flourished, making Mumbai the entertainment capital of India and contributing significantly to the economy and global cultural influence.
        </p>

        <p class="fw-bold mt-4">
          The 1980s laid the foundation for Maharashtra’s sustained economic dominance, making it a beacon of modernity, innovation, and ambition.
        </p>
          `,
        },
        {
          id: 'tourismModal',
          title: '🌍 Tourism Growth (2000s–Present)',
          label: 'tourismModalLabel',
          headerClass: 'bg-light',
          content: `
          <h4 class="text-primary fw-semibold mb-3">Rediscovering Maharashtra – A Journey of Culture, Nature, and Heritage</h4>

        <p>
          From the early 2000s, **Maharashtra** witnessed a dramatic transformation in its tourism landscape. Strategic government initiatives, global marketing, and increased infrastructural investment turned the state into one of India&apos;s **top tourist destinations**—appealing to history lovers, spiritual seekers, nature enthusiasts, and adventure travelers alike.
        </p>

        <h5 class="text-success mt-4">🏞️ Diverse Tourist Attractions</h5>
        <p>
          Maharashtra offers a rare blend of **coastlines, mountains, temples, forts, caves, and wildlife**:
        </p>
        <ul>
          <li><strong>Hill Stations:</strong> Lonavala, Mahabaleshwar, Matheran, Panchgani</li>
          <li><strong>Beaches:</strong> Alibaug, Kelve, Ganpatipule, Tarkarli</li>
          <li><strong>Heritage Sites:</strong> Ajanta & Ellora, Elephanta Caves, Raigad & Sindhudurg Forts</li>
          <li><strong>Wildlife Sanctuaries:</strong> Tadoba, Pench, Bhimashankar</li>
        </ul>

        <h5 class="text-warning mt-4">🕌 Pilgrimage & Spiritual Circuits</h5>
        <p>
          The growth of religious tourism brought renewed attention to places like:
        </p>
        <ul>
          <li>Shirdi (Sai Baba)</li>
          <li>Nashik (Kumbh Mela city)</li>
          <li>Trimbakeshwar & Bhimashankar (Jyotirlingas)</li>
          <li>Jejuri, Pandharpur, Tuljapur (cultural devotion centers)</li>
        </ul>

        <h5 class="text-info mt-4">✈️ Infrastructure & Global Access</h5>
        <p>
          Tourism was boosted by enhanced infrastructure:
        </p>
        <ul>
          <li>Expansion of Mumbai & Pune international airports</li>
          <li>Improved rail and road connectivity to remote areas</li>
          <li>Government-backed MTDC (Maharashtra Tourism Development Corporation) initiatives</li>
        </ul>

        <h5 class="text-secondary mt-4">🎭 Cultural Festivals & Events</h5>
        <p>
          Events like **Kala Ghoda Arts Festival**, **Ellora-Ajanta Festival**, **Ganesh Utsav**, and **Lavani Mahotsav** have attracted both Indian and international tourists.
        </p>

        <h5 class="text-danger mt-4">🏕️ Ecotourism & Agrotourism</h5>
        <p>
          Maharashtra also became a pioneer in **ecotourism and rural tourism**, offering stays in tribal villages, farming experiences in Konkan and Vidarbha, and forest treks.
        </p>

        <p class="fw-bold mt-4">
          Maharashtra today stands as a vibrant, culturally rich state that continues to welcome the world to explore its legacy, nature, cuisine, and people.
        </p>`, 
        }
]