import { useState } from 'react';
import './App.css';

const services = [
  {
    number: '01',
    icon: '↗',
    title: 'Borrow & return',
    description:
      'Take home your next favourite book. Our friendly team is here to make borrowing simple for every reader.',
  },
  {
    number: '02',
    icon: '⌘',
    title: 'Internet & computers',
    description:
      'Get online, do your research, or work on a project with free computer and internet access.',
  },
  {
    number: '03',
    icon: '◎',
    title: 'Reading & study spaces',
    description:
      'Find a quiet corner, spread out your notes, and settle in. There is a welcoming space for everyone.',
  },
  {
    number: '04',
    icon: '✳',
    title: 'Workshops & literacy',
    description:
      'Build new skills through community workshops, reading groups, and programmes for all ages.',
  },
];

const events = [
  {
    date: 'SAT, 24 OCT',
    time: '10:30 AM – 11:30 AM',
    title: 'Saturday Story Circle',
    description:
      'Bring little listeners for a joyful hour of picture books, playful voices, and a little imagination.',
    tag: 'FOR LITTLE READERS',
    color: 'peach',
  },
  {
    date: 'WED, 28 OCT',
    time: '4:00 PM – 5:30 PM',
    title: 'Read, Make & Imagine',
    description:
      'A relaxed after-school creative session where young readers turn a favourite story into something new.',
    tag: 'CREATIVE WORKSHOP',
    color: 'lavender',
  },
  {
    date: 'SAT, 07 NOV',
    time: '11:00 AM – 12:30 PM',
    title: 'Community Reading Day',
    description:
      'Meet your neighbours, share a story you love, and discover what is happening at your local library.',
    tag: 'ALL ARE WELCOME',
    color: 'yellow',
  },
];

const books = [
  {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    year: '1911',
    description:
      'A lonely girl discovers a hidden garden and the healing magic of new beginnings.',
    cover: 'garden',
    label: 'A TIMELESS CLASSIC',
  },
  {
    title: 'The Boy, the Mole, the Fox and the Horse',
    author: 'Charlie Mackesy',
    year: '2019',
    description:
      'An uplifting illustrated story about kindness, friendship, and finding your way home.',
    cover: 'mole',
    label: 'A LITTLE WISDOM',
  },
  {
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    year: '2013',
    description:
      'A beautiful invitation to see the living world with gratitude, curiosity, and care.',
    cover: 'sweetgrass',
    label: 'FOR CURIOUS MINDS',
  },
];

const navigation = [
  ['Home', '#home'],
  ['About us', '#about'],
  ['Services', '#services'],
  ['Events', '#events'],
  ['Featured books', '#books'],
  ['Contact us', '#contact'],
];

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path
            d="M20 34V17m0 6c-8 0-13-4-13-12 8 0 13 4 13 12Zm0-3c0-8 5-13 13-13 0 8-5 13-13 13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13 34h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="brand-name">
        bright future
        <span>community library</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon" aria-hidden="true">
          {service.icon}
        </span>
        <span className="service-number">{service.number}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className={`event-date event-date-${event.color}`}>
        <span>{event.date.split(', ')[0]}</span>
        <strong>{event.date.split(', ')[1]}</strong>
      </div>
      <div className="event-details">
        <span className="event-tag">{event.tag}</span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <span className="event-time">{event.time}</span>
      </div>
      <a className="event-arrow" href="#contact" aria-label={`Ask us about ${event.title}`}>
        ↗
      </a>
    </article>
  );
}

function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className={`book-cover book-cover-${book.cover}`} aria-label={`Cover for ${book.title}`}>
        <span className="cover-art" aria-hidden="true">
          {book.cover === 'garden' && '✿'}
          {book.cover === 'mole' && '☼'}
          {book.cover === 'sweetgrass' && '❋'}
        </span>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">{book.author}</span>
      </div>
      <div className="book-info">
        <span className="book-label">{book.label}</span>
        <h3>{book.title}</h3>
        <p className="book-author">By {book.author} <span>·</span> {book.year}</p>
        <p className="book-description">{book.description}</p>
      </div>
    </article>
  );
}

function validateForm(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.message.trim()) errors.message = 'Please write us a message.';

  return errors;
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-field" htmlFor="contact-name">
          Full name
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </label>
        <label className="form-field" htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </label>
      </div>
      <label className="form-field" htmlFor="contact-message">
        Your message
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          placeholder="How can we help?"
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
      </label>
      <div className="form-footer">
        <button className="button button-dark" type="submit">
          Send your message <span aria-hidden="true">↗</span>
        </button>
        <p className="form-feedback" role="status" aria-live="polite">
          {submitted ? 'Thanks for reaching out! We’ll be in touch soon.' : ''}
        </p>
      </div>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" />
        A little more room to grow, right here in your neighbourhood.
        <a href="#about">Come on in <span aria-hidden="true">↗</span></a>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            className={`main-navigation${menuOpen ? ' navigation-open' : ''}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {navigation.map(([label, href]) => (
              <a
                className={label === 'Contact us' ? 'nav-contact' : ''}
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-sparkle">✳</span> ROOTED IN RUSIZI · OPEN TO EVERYONE</span>
            <h1>A place to<br />grow <em>together.</em></h1>
            <p className="hero-description">
              Good stories, new ideas, and a friendly face. There’s always something waiting for you at Bright Future.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#services">Explore the library <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#events">See what’s on <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-note">
              <span className="note-stars" aria-hidden="true">✳ ✳ ✳</span>
              <span>A little curious? You’re in the right place.</span>
            </div>
          </div>
          <div className="hero-visual" role="img" aria-label="A sunny, green hillside landscape inspired by Rusizi, Rwanda">
            <div className="hero-image" />
            <div className="hero-sticker">
              <span>OPEN</span>
              <strong>to<br />everyone</strong>
              <span className="sticker-heart" aria-hidden="true">♡</span>
            </div>
            <div className="hero-caption">
              <span className="caption-dot" />
              A brighter future begins right here in Rusizi.
            </div>
          </div>
        </section>

        <section className="welcome-strip" id="about">
          <span className="strip-mark" aria-hidden="true">✳</span>
          <p>
            A fresh chapter for our community. <span>Bright Future Library is here to make reading, learning, and belonging part of every day.</span>
          </p>
          <a href="#contact" aria-label="Learn more about the library">↗</a>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="services-intro">
            <SectionHeading
              eyebrow="A GOOD PLACE TO BEGIN"
              title={<>Room for every<br />kind of <em>curiosity.</em></>}
              description="More than shelves and stories — we’re a place to meet, make, learn, and feel right at home."
            />
            <a className="text-link" href="#contact">Get to know us <span aria-hidden="true">→</span></a>
          </div>
          <div className="services-grid">
            {services.map((service) => <ServiceCard service={service} key={service.number} />)}
          </div>
        </section>

        <section className="events-section section-pad" id="events">
          <div className="events-top">
            <SectionHeading
              eyebrow="SAVE YOURSELF A SPOT"
              title={<>Good things are<br />coming <em>up.</em></>}
              description="A story, a workshop, a new friend. There’s always something to look forward to."
            />
            <span className="hand-note">Come as you are <span aria-hidden="true">↙</span></span>
          </div>
          <div className="events-list">
            {events.map((event) => <EventCard event={event} key={event.title} />)}
          </div>
          <p className="event-footnote"><span aria-hidden="true">✳</span> All events are free and everyone is welcome.</p>
        </section>

        <section className="books-section section-pad" id="books">
          <div className="books-heading">
            <SectionHeading
              eyebrow="PICKED WITH YOU IN MIND"
              title={<>A few we <em>love.</em></>}
              description="Stories that stay with you, ideas worth sharing, and something for your next quiet afternoon."
            />
            <a className="text-link" href="#contact">Ask us for a recommendation <span aria-hidden="true">→</span></a>
          </div>
          <div className="books-grid">
            {books.map((book) => <BookCard book={book} key={book.title} />)}
          </div>
          <p className="books-footnote">Your next favourite might be waiting on our shelves. <span aria-hidden="true">♡</span></p>
        </section>

        <section className="mission-section">
          <div className="mission-flower" aria-hidden="true">✳</div>
          <span className="eyebrow">A NOTE FROM YOUR LIBRARY</span>
          <h2>Big things begin<br />with <em>an open book.</em></h2>
          <p>We believe every person deserves the space, support, and stories to imagine a brighter future. We’re glad you’re here.</p>
          <a className="button button-light" href="#contact">Come say hello <span aria-hidden="true">↗</span></a>
          <span className="mission-doodle" aria-hidden="true">✳</span>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-intro">
            <SectionHeading
              eyebrow="WE’RE EASY TO FIND"
              title={<>Drop us a<br /><em>little hello.</em></>}
              description="Got a question, an idea, or a book to recommend? We’d love to hear from you."
            />
            <div className="contact-details">
              <div className="contact-detail">
                <span className="detail-icon" aria-hidden="true">⌖</span>
                <div><span>COME ON BY</span><address>Rusizi District<br />Western Province, Rwanda</address></div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon" aria-hidden="true">↗</span>
                <div><span>GIVE US A RING</span><a href="tel:+250780000000">+250 780 000 000</a></div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon" aria-hidden="true">✉</span>
                <div><span>WRITE US A NOTE</span><a href="mailto:hello@brightfuturelibrary.org">hello@brightfuturelibrary.org</a></div>
              </div>
            </div>
            <p className="opening-hours"><span className="opening-dot" /> Open Monday – Saturday, 9 am – 6 pm</p>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading">
              <span className="form-spark" aria-hidden="true">✳</span>
              <h3>Send us a note</h3>
              <p>We’ll get back to you as soon as we can.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-area">
            <Brand footer />
            <p>A little space for big ideas.<br />Here for every reader, every day.</p>
          </div>
          <div className="footer-links">
            <span>TAKE A LOOK</span>
            {navigation.slice(1, 5).map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </div>
          <div className="footer-visit">
            <span>FIND YOUR WAY HERE</span>
            <p>Rusizi District<br />Western Province, Rwanda</p>
            <a href="mailto:hello@brightfuturelibrary.org">hello@brightfuturelibrary.org</a>
          </div>
          <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bright Future Library</span>
          <span>Made with care, for our community <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
    </>
  );
}

export default App;
