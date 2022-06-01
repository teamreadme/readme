-- AlterTable
ALTER TABLE "read_me" ADD COLUMN     "reads" INTEGER NOT NULL DEFAULT 0;
update "read_me" set reads=323 from users u where u.username='jreynoldsdev' and u.id=user_id;
update "read_me" set reads=20  from users u where u.username='cody' and u.id=user_id;
update "read_me" set reads=5  from users u where u.username='ryan_tinklenberg' and u.id=user_id;
update "read_me" set reads=5  from users u where u.username='jekrch' and u.id=user_id;
update "read_me" set reads=10  from users u where u.username='dajacks' and u.id=user_id;
