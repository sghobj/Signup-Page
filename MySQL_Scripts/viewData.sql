select users.*, dob.birthdate, dob.birthPlace, address.street, address.city, address.country 
from users
inner join address on address.userID = users.user_id
inner join dob on dob.userID = users.user_id;