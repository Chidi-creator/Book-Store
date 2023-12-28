/* eslint-disable react/prop-types */


const UserBooksModal = ({ onClose, user, books }) => {
    return ( 
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center "
        '
        onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl flex flex-col relative p-4"
            >
         <h2 className="text-xl font-semibold mb-4">{user ? `${user.username}'s Books` : ''}</h2>
      {user &&  (
        <div>
          {books.length > 0 ? ( books
            .filter(book => book.user_id === user._id)
            .map(book => (
              <div key={book._id} className="border p-4 rounded mb-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Publish Year: {book.publishYear}</p>
              </div>
            ))) : (
                <p>User Has Not Created a Book Yet</p>
            )}
        </div>
      )}
      <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      

            </div>

        </div>

     );
}
 
export default UserBooksModal;