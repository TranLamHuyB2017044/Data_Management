CREATE database MOVIE_BOOKING;
USE MOVIE_BOOKING;
-- SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE movies (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `poster_url` VARCHAR(300) NOT NULL,
  `release_date` VARCHAR(10) NOT NULL,
  `duration` INT NOT NULL,
  `category` VARCHAR(20) NOT NULL,
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
  `date` VARCHAR(10) NOT NULL,
  `time` VARCHAR(10) NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
  FOREIGN KEY (`movie_id`) REFERENCES movies(`movie_id`)
);

CREATE TABLE bookedSeats(
	`seat_id` char(4),
    `movie_id` INT NOT NULL,
    primary key (`seat_id`,`movie_id`),
    foreign key (`movie_id`) references movies (`movie_id`)
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
insert into users(`name`, `username`, `password`, `email`) values ('', 'khoi', 'sdf', 'khoi@gmail.com');

delimiter $$
drop procedure if exists removeBooking $$
create procedure removeBooking(id int)
begin 
	delete from bookedSeats where `booking_id`=id;
    delete from bookings where `booking_id`=id;
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
    return releasedate >= currentDate;
end;
delimiter;
select checkReleaseDate('1-04-2024')

delimiter $$
drop procedure  if exists movie_booking $$
create procedure movie_booking(`new_user_id` int , `new_movie_id` int , `new_date` varchar(10),`new_time` varchar(10), `new_location` varchar(200), `new_seat_id` varchar(4))
begin 
	declare cnt int default 0;
    declare id int default 1;
    declare validDate boolean default true;
    declare releaseDate varchar(10);
	start transaction;
    select count(*) into cnt from bookings where `user_id`=`new_user_id` and `movie_id`=`new_movie_id` and `date`=  `new_date` and `time`=`new_time`and `location`=`new_location`;

    if cnt = 0 then
		insert into bookings(`user_id`,`movie_id`,`date`,`time`,`location`) value (`new_user_id`,`new_movie_id`,`new_date`,`new_time`,`new_location`);
    end if;
    
    -- check release date of film: just allow booking if release >= current date
    select `release_date` into releaseDate from movies where `movie_id`=`new_movie_id`;
	select checkReleaseDate(releaseDate) into validDate;
    -- check booked seats: 2 booking users at the same, if user1 booked with the same seats before user2 then booking user2 will cancel.
    select count(*) into cnt from bookedSeats where `seat_id` =`new_seat_id` and `movie_id`=`new_movie_id`;
    if validDate = true and cnt=0 then
		insert into bookedSeats(`seat_id`,`movie_id`) value (`new_seat_id`,`new_movie_id`);
		commit;
	else rollback;
	end if;
end;
delimeter;
call movie_booking(1,2,'02-04-2023','20:05', 'Can Tho','E17'); 
