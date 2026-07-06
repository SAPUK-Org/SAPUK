import bcrypt from "bcrypt";
import db from "../connection";
import format from "pg-format";
import { SeedData } from "../../types";
import { events } from "../data/test-data/events";
import { crisis_resources } from "../data/test-data/crisis-resources";
import { useful_links } from "../data/test-data/useful-links";
import { notes } from "../data/test-data/notes";
import { note_comments } from "../data/test-data/note-comments";
import { fundraising_champs as testFundraisingChamps } from "../data/test-data/fundraising-champs";
import { community_causes as testCommunityCauses } from "../data/test-data/community-causes";

const seed = async ({ users, fundraising_champs, community_causes }: SeedData) => {
  try {
    await db.query("DROP TABLE IF EXISTS audit_logs CASCADE");
    await db.query("DROP TABLE IF EXISTS note_comments CASCADE");
    await db.query("DROP TABLE IF EXISTS notes CASCADE");
    await db.query("DROP TABLE IF EXISTS useful_links CASCADE");
    await db.query("DROP TABLE IF EXISTS crisis_resources CASCADE");
    await db.query("DROP TABLE IF EXISTS community_causes CASCADE");
    await db.query("DROP TABLE IF EXISTS fundraising_champs CASCADE");
    await db.query("DROP TABLE IF EXISTS resources CASCADE");
    await db.query("DROP TABLE IF EXISTS events CASCADE");
    await db.query("DROP TABLE IF EXISTS users CASCADE");

    await db.query("DROP TYPE IF EXISTS resource_type");
    await db.query("DROP TYPE IF EXISTS staff_role");

    await db.query(
      "CREATE TYPE staff_role AS ENUM ('admin', 'editor', 'staff')",
    );
    await db.query(
      "CREATE TYPE resource_type AS ENUM ('image', 'document', 'video', 'other')",
    );

    // Create tables
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        profile_picture TEXT,
        password_hash TEXT NOT NULL,
        role staff_role DEFAULT 'staff' NOT NULL,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        cover_image TEXT,
        dates_description TEXT,
        schedule_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
        starts_at TIMESTAMP WITH TIME ZONE,
        ends_at TIMESTAMP WITH TIME ZONE,
        location JSONB NOT NULL DEFAULT '[]'::jsonb,
        type TEXT,
        max_volunteers INTEGER DEFAULT NULL,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        external_links JSONB NOT NULL DEFAULT '[]'::jsonb,
        studio_partners JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE resources (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        resource_type resource_type NOT NULL,
        file_name TEXT NOT NULL,
        file_key TEXT,
        uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        attachable_type TEXT,
        attachable_id INTEGER,
        metadata JSONB,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE crisis_resources (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone_or_url TEXT NOT NULL,
        description TEXT,
        hours TEXT,
        type TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE useful_links (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        description TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE note_comments (
        id SERIAL PRIMARY KEY,
        note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        resource_id INTEGER,
        method TEXT,
        route TEXT,
        status_code INT,
        metadata JSONB,
        ip TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE fundraising_champs (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        champ_type TEXT NOT NULL DEFAULT 'individual',
        summary TEXT NOT NULL,
        body TEXT,
        image TEXT,
        logo TEXT,
        website_url TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE community_causes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        summary TEXT NOT NULL,
        image TEXT,
        link_url TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Insert users into the `users` table (hash passwords before insert)
    const insertUsersQueryString = format(
      `INSERT INTO users (username, email, profile_picture, password_hash, role, is_active) VALUES %L RETURNING id`,
      users.map((user) => [
        user.username,
        user.email,
        user.profile_picture ?? null,
        bcrypt.hashSync(user.password_hash, 10),
        user.role,
        user.is_active,
      ]),
    );
    await db.query(insertUsersQueryString);

    const insertEventsQueryString = format(
      `INSERT INTO events (title, description, cover_image, dates_description, schedule_slots, starts_at, ends_at, location, type, max_volunteers, is_active, external_links, studio_partners, created_by) VALUES %L RETURNING id`,
      events.map((event) => [
        event.title,
        event.description,
        event.cover_image ?? null,
        event.dates_description ?? null,
        JSON.stringify(event.schedule_slots ?? []),
        event.starts_at ?? null,
        event.ends_at ?? null,
        JSON.stringify(
          Array.isArray(event.location) ? event.location : [event.location],
        ),
        event.type ?? null,
        event.max_volunteers ?? null,
        event.is_active ?? true,
        JSON.stringify(event.external_links ?? []),
        JSON.stringify(event.studio_partners ?? []),
        event.created_by,
      ]),
    );
    await db.query(insertEventsQueryString);

    const insertCrisisResourcesQueryString = format(
      `INSERT INTO crisis_resources (name, phone_or_url, hours, type, sort_order, is_active) VALUES %L RETURNING id`,
      crisis_resources.map((crisisResource) => [
        crisisResource.name,
        crisisResource.phone_or_url,
        crisisResource.hours,
        crisisResource.type,
        crisisResource.sort_order ?? null,
        crisisResource.is_active,
      ]),
    );
    await db.query(insertCrisisResourcesQueryString);

    const insertUsefulLinksQueryString = format(
      `INSERT INTO useful_links (title, url, description, sort_order, is_active, metadata) VALUES %L RETURNING id`,
      useful_links.map((link) => [
        link.title,
        link.url,
        link.description ?? null,
        link.sort_order ?? 0,
        link.is_active ?? true,
        link.metadata ? JSON.stringify(link.metadata) : null,
      ]),
    );
    await db.query(insertUsefulLinksQueryString);

    const insertNotesQueryString = format(
      `INSERT INTO notes (title, content, author_id) VALUES %L RETURNING id`,
      notes.map((note) => [note.title, note.content, note.author_id]),
    );
    await db.query(insertNotesQueryString);

    const insertNoteCommentsQueryString = format(
      `INSERT INTO note_comments (note_id, author_id, content) VALUES %L RETURNING id`,
      note_comments.map((nc) => [nc.note_id, nc.author_id, nc.content]),
    );
    await db.query(insertNoteCommentsQueryString);

    const champsToInsert = fundraising_champs ?? testFundraisingChamps;
    if (champsToInsert.length > 0) {
      const insertChampsQueryString = format(
        `INSERT INTO fundraising_champs (slug, name, champ_type, summary, body, image, logo, website_url, sort_order, is_active, created_by) VALUES %L RETURNING id`,
        champsToInsert.map((champ) => [
          champ.slug,
          champ.name,
          champ.champ_type,
          champ.summary,
          champ.body ?? null,
          champ.image ?? null,
          champ.logo ?? null,
          champ.website_url ?? null,
          champ.sort_order ?? 0,
          champ.is_active ?? true,
          champ.created_by ?? null,
        ]),
      );
      await db.query(insertChampsQueryString);
    }

    const causesToInsert = community_causes ?? testCommunityCauses;
    if (causesToInsert.length > 0) {
      const insertCausesQueryString = format(
        `INSERT INTO community_causes (name, summary, image, link_url, sort_order, is_active, created_by) VALUES %L RETURNING id`,
        causesToInsert.map((cause) => [
          cause.name,
          cause.summary,
          cause.image ?? null,
          cause.link_url ?? null,
          cause.sort_order ?? 0,
          cause.is_active ?? true,
          cause.created_by ?? null,
        ]),
      );
      await db.query(insertCausesQueryString);
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

export default seed;
