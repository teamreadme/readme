insert into users (id, first_name, last_name, email, username, "emailVerified") values (
    'demouserid','Jake', 'Reynolds', 'jake@readmefirst.co', 'jreynoldsdevdemo', now()
);

insert into read_me (id, "user_id", "text", reads) values (
    'demoreadmeid', (select id from users where username='jreynoldsdevdemo'), '<h1>Hello!</h1> Checkout `.env` to update the default inspiration README', 100
);