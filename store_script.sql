create table reports(
	id serial primary key,
	title text
);

create table documents(
	id serial primary key,
	name text,
	filetype text,
	report_id int references reports(id)
);

create table pages(
	id serial primary key,
	body text,
	footnote text,
	document_id int references documents(id)
);

insert into reports (title) values ('fourth report');

insert into documents (name, filetype) values ('Document 9', 'pdf');

insert into pages (body, footnote, document_id) values ('Page 3', 'Source 3', 5);


select d.id document_id from documents d
left join pages p on d.id = p.document_id
where p.id is null;

select title, COUNT(p.id) from reports r
inner join documents d on r.id = d.report_id
inner join pages p on d.id = p.document_id
group by title;

create table comments (
    id serial primary key,
    message text not null,
    report_id int references reports(id),
    document_id int references documents(id),
    page_id int references pages(id)
);