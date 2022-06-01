-- AlterTable
ALTER TABLE "read_me" ADD COLUMN     "reads" INTEGER NOT NULL DEFAULT 0;
update "read_me" set reads=323 where username='jreynoldsdev';
update "read_me" set reads=20 where username='cody';
update "read_me" set reads=5 where username='ryan_tinklenberg';
update "read_me" set reads=5 where username='jekrch';
update "read_me" set reads=10 where username='dajacks';
