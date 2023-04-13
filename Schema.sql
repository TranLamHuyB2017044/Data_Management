-- ALTER USER 'root'@'localhost' IDENTIFIED BY '12345';
CREATE database MOVIE_BOOKING;
USE MOVIE_BOOKING;

CREATE TABLE movies (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `poster_url` VARCHAR(300) NOT NULL,
  `release_date` VARCHAR(10) NOT NULL,
  `duration` INT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `national` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`movie_id`)
);

CREATE TABLE users (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(20) not null,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE bookings (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `date_book` VARCHAR(10) NOT NULL,
  `time_book` VARCHAR(10) NOT NULL,
  `date_start` VARCHAR(10) NOT NULL,
  `time_start` VARCHAR(10) NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
  FOREIGN KEY (`movie_id`) REFERENCES movies(`movie_id`)
  		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE bookedSeats(
	`seat_id` char(4),
    `booking_id` INT NOT NULL,
    primary key (`seat_id`,`booking_id`),
    foreign key (`booking_id`) references bookings (`booking_id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
delimiter $$
drop trigger  if exists check_newuser $$
create trigger check_newUser
before insert 
on users for each row
begin
	declare cnt int default 0;
	if new.`name` is null or new.`name` = '' then
		signal sqlstate '50000'
        set message_text  ='Name is null';
	elseif new.`username` is null or new.`username` ='' then
		signal sqlstate '50000'
        set message_text  ='Username is null';
	elseif new.`password` is null or new.`password` ='' then
		signal sqlstate '50000'
        set message_text  ='password is null';
	elseif new.`email` is null or new.`email` ='' then
		signal sqlstate '50000'
        set message_text  ='Email is null';
	end if;
    select count(*) into cnt from users where `username`=new.`username`;
    if(cnt >0) then
		signal sqlstate '50001'
        set message_text  ='Username existed';
	end if;
    select count(*) into cnt from users where `email`=new.`email`;
    if(cnt >0) then
		signal sqlstate '50002'
        set message_text  ='Email existed';
	end if;
end;
delimiter;
-- check valid date of movie when booking
delimiter $$
drop function if exists checkReleaseDate $$
create function checkReleaseDate(releasedate varchar(10))
returns boolean
deterministic
begin 
	declare currentDate date default curdate();
    set releasedate= str_to_date(releasedate, '%d-%m-%Y');
    return releasedate <= currentDate;
end;
delimiter;

delimiter $$
drop procedure  if exists movie_booking $$
create procedure movie_booking(`new_user_id` int , `new_movie_id` int , `new_date_book` varchar(10),`new_time_book` varchar(10),`new_date_start` varchar(10),`new_time_start` varchar(10), `new_location` varchar(200), `new_seat_id` varchar(4))
begin 
	declare cnt int default 0;
    declare id int ;
    declare idOfBooking int ;
    declare validDate boolean default true;
    declare releaseDate varchar(10);
	start transaction;
    select count(*) into cnt from bookings where `user_id`=`new_user_id` and `movie_id`=`new_movie_id` and `date_book`=  `new_date_book` and `time_book`=`new_time_book`and `location`=`new_location`;
    if cnt = 0 then
		insert into bookings(`user_id`,`movie_id`,`date_book`,`time_book`, `date_start`,`time_start`,`location`) value (`new_user_id`,`new_movie_id`,`new_date_book`,`new_time_book`,`new_date_start`,`new_time_start`,`new_location`);
    end if;
    
    -- check release date of film: just allow booking if release >= current date
    select `release_date` into releaseDate from movies where `movie_id`=`new_movie_id`;
	select checkReleaseDate(releaseDate) into validDate;
    -- check booked seats: 2 booking users at the same, if user1 booked with the same seats before user2 then booking user2 will cancel.
    select count(*) into cnt from bookings b join bookedSeats bs on bs.`booking_id` = b.`booking_id` where `seat_id` =`new_seat_id` and  b.`movie_id`=`new_movie_id`;
    select * from bookings b join bookedSeats bs on bs.`booking_id` = b.`booking_id` where `seat_id` =`new_seat_id` and  b.`movie_id`=`new_movie_id`;
    if validDate = true and cnt=0 then
		select `booking_id` into `idOfBooking` from bookings where `user_id`=`new_user_id` and `movie_id`=`new_movie_id` and `date_book`=  `new_date_book` and `time_book`=`new_time_book`and `location`=`new_location`;
		insert into bookedSeats(`seat_id`,`booking_id`) value (`new_seat_id`,`idOfBooking`);
		commit;
	else rollback;
	end if;
end;
delimeter;
-- call movie_booking(2,4,'13-04-2023','10:01','02-04-2023','20:07', 'Can Tho','E8'); 


 delimiter $$
drop procedure if exists removeBooking $$
create procedure removeBooking(id int)
begin 
	delete from bookings where `booking_id`=id;
	delete from bookedSeats where `booking_id`=id;
end;
delimiter;

delimiter $$
drop procedure if exists removeUser $$
create procedure removeUser(`id` int)
begin 
	declare idOfBooking int;
    select `booking_id` into idOfBooking from bookings where `user_id`=`id`;
	delete from users where `user_id`=`id`;
    call removeBooking(idOfBooking);
end;
delimiter;

 