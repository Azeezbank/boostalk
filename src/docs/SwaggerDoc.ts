//Register Swagger documentation for the API endpoints
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - FullName
 *               - Username
 *               - Phone
 *               - Email
 *               - Password
 *             properties:
 *               FullName:
 *                 type: string
 *                 example: Boostalk Media
 *               Username:
 *                 type: string
 *                 example: Boostalk001
 *               Phone:
 *                 type: string
 *                 example: +2348012345678
 *               Email:
 *                 type: string
 *                 example: boostalk@example.com
 *               Password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered. Verification code sent to email.
 *       400:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already registered.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

//verify user registration
/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify a user's email using a verification code
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "a1b2c3"
 *     responses:
 *       200:
 *         description: Account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account verified successfully.
 *       400:
 *         description: Invalid verification code
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Sign in user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 example: user@example.com
 *               Password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     Username:
 *                       type: string
 *                       example: johndoe
 *                     Phone:
 *                       type: string
 *                       example: "+2348012345678"
 *                     Email:
 *                       type: string
 *                       example: user@example.com
 *                     Role:
 *                       type: string
 *                       example: user
 *       400:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */

/**
 * @swagger
 * /api/auth/forgot/password:
 *   post:
 *     summary: Send a password reset link to the user's email
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *             properties:
 *               Email:
 *                 type: string
 *                 description: User's email address
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Reset Link Sent Successfully
 *       400:
 *         description: Invalid email address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Email Address
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/reset/password:
 *   post:
 *     summary: Reset a user's password using a token
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token sent to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123!
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Updated
 *       400:
 *         description: Password mismatch or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PasswordMismatch, Please input same password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/change/password:
 *   post:
 *     summary: Send password reset link to user email
 *     description: Protected route. Requires JWT token in Authorization header.
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Reset Link Sent Successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is invalid
 *       403:
 *         description: Forbidden - Token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is missing
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/auth/new/password:
 *   post:
 *     summary: Change user password
 *     description: >
 *       Protected route. User must be authenticated via JWT token.
 *       After clicking the password reset link sent by email,
 *       the user will submit new password and confirmation to this endpoint.
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newStrongPassword123
 *               confirmNewPassword:
 *                 type: string
 *                 example: newStrongPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Changed Successfully
 *       403:
 *         description: Password mismatch error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbiden, Password Mismatch, the new password input same password for both new pass and confirm password field
 *       404:
 *         description: User not found error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Cannot be found, reset your password with forgot password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

//Post document
/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create a new blog post
 *     description: Allows an authenticated user to create a blog post with a title and content.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of the blog post.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/post/public/feed:
 *   get:
 *     summary: Get all posts in the public feed
 *     tags:
 *       [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all posts in the public feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "post123"
 *                       title:
 *                         type: string
 *                         example: "Public Post Title"
 *                       content:
 *                         type: string
 *                         example: "This is a public post available to all users."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-18T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-18T13:00:00Z"
 *                       userId:
 *                         type: string
 *                         example: "user456"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *       500:
 *         description: Failed to fetch public posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failes to select posts
 */

/**
 * @swagger
 * /api/post/my/personal/feed:
 *   get:
 *     summary: Get posts created by the authenticated user
 *     tags:
 *       [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of posts by the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1a2b3c"
 *                   title:
 *                     type: string
 *                     example: "My Personal Post"
 *                   content:
 *                     type: string
 *                     example: "This is my personal post content..."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-18T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-18T13:00:00Z"
 *                   userId:
 *                     type: string
 *                     example: "abc123"
 *                   image:
 *                     type: string
 *                     example: https://image.example.com/my-post.jpg
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "abc123"
 *                       Username:
 *                         type: string
 *                         example: "john_doe"
 *       404:
 *         description: Authenticated user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       500:
 *         description: Server error while retrieving posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to select individual post
 */


/**
 * @swagger
 * /api/post/{userId}/feed:
 *   get:
 *     summary: Get all posts for a specific user
 *     tags:
 *       [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose posts to retrieve
 *     responses:
 *       200:
 *         description: A list of posts by the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1a2b3c"
 *                   title:
 *                     type: string
 *                     example: "My First Post"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the post..."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-18T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-18T13:00:00Z"
 *                   userId:
 *                     type: string
 *                     example: "123"
 *                   images:
 *                     type: string
 *                     example: "https://example.com/image.jpg"
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123"
 *                       Username:
 *                         type: string
 *                         example: "john_doe"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       500:
 *         description: Failed to fetch user posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to select individual post
 */


/**
 * @swagger
 * /api/post/followers:
 *   get:
 *     summary: Get posts from users the current user follows
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts from followed users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to fetch posts
 */


//Like document file
/**
 * @swagger
 * /api/toggle-like/:postId:
 *   post:
 *     summary: Like or Unlike a Post
 *     description: |
 *       Allows an authenticated user to like a post. If the post has already been liked by the user, the post will be unliked.
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to like or unlike
 *     responses:
 *       200:
 *         description: Like or unlike successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post liked successfully
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to like or unlike post
 */

// Comment document file
/**
 * @swagger
 * /api/comment/:postId:
 *   post:
 *     summary: Create a comment on a post
 *     description: |
 *       Allows an authenticated user to add a comment to a specific post.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a great post!
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *       404:
 *         description: User or Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User or Post Not Found
 *       500:
 *         description: Failed to create comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create comment
 */

/**
 * @swagger
 * /api/follow/{followingId}:
 *   post:
 *     summary: Follow or unfollow a user
 *     description: Authenticated users can follow or unfollow another user by providing the target user's ID.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to follow or unfollow
 *     responses:
 *       200:
 *         description: Successfully followed or unfollowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Followed
 *                 following:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Cannot follow yourself
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, You cannot follow yourself
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Action Failed
 */

/**
* @swagger
* paths:
*   /api/follow/followers/{userId}:
*     get:
*       tags:
*         [Follow]
*       summary: Get followers of the authenticated user
*       description: Returns a list of users who follow the authenticated user.
*       parameters:
*         - name: userId
*           in: path
*           required: true
*           schema:
*             type: string
*           description: ID of the user (not used in controller logic; uses authenticated user ID from token)
*       security:
*         - bearerAuth: []
*       responses:
*         '200':
*           description: List of followers
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   followers:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           example: 2
*                         Username:
*                           type: string
*                           example: john_doe
*         '401':
*           description: Unauthorized
*         '500':
*           description: Failed to fetch followers
*/

/**
* @swagger
* paths:
*   /api/follow/following/{userId}:
*     get:
*       tags:
*         [Follow]
*       summary: Get users the authenticated user is following
*       description: Returns a list of users that the authenticated user follows.
*       parameters:
*         - name: userId
*           in: path
*           required: true
*           schema:
*             type: string
*           description: ID of the user (not used in controller logic; uses authenticated user ID from token)
*       security:
*         - bearerAuth: []
*       responses:
*         '200':
*           description: List of following users
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   following:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           example: 3
*                         Username:
*                           type: string
*                           example: alex_king
*         '401':
*           description: Unauthorized
*         '500':
*           description: Failed to fetch following users
*/

//Messages
/**
 * @swagger
 * /api/messages/chat/partners:
 *   get:
 *     summary: Get chat partners and last messages
 *     description: |
 *       Retrieves a list of users the authenticated user has chatted with,
 *       including the most recent message, time of message, username, and profile picture.
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved chat partners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   partnerId:
 *                     type: string
 *                     format: uuid
 *                     description: ID of the chat partner
 *                   username:
 *                     type: string
 *                     description: Username of the chat partner
 *                   profilePic:
 *                     type: string
 *                     format: uri
 *                     nullable: true
 *                     description: Profile picture URL of the chat partner
 *                   lastMessage:
 *                     type: string
 *                     description: Content of the last message
 *                   time:
 *                     type: string
 *                     format: date-time
 *                     description: Time the last message was sent
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{userId}/{chatPartnerId}:
 *   get:
 *     summary: Get all messages between two users
 *     description: Retrieve all messages exchanged between the authenticated user and the chat partner, ordered by timestamp.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       [Chat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the requesting user
 *       - in: path
 *         name: chatPartnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat partner
 *     responses:
 *       200:
 *         description: List of messages between the two users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   content:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   Sender:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Username:
 *                         type: string
 *                   Receiver:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Username:
 *                         type: string
 *       500:
 *         description: Failed to fetch messages
 */

//Profile
/**
 * @swagger
 * /api/profile/{id}:
 *   patch:
 *     summary: Update user profile information and images
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               bio:
 *                 type: string
 *               profilePic:
 *                 type: string
 *                 format: binary
 *               coverPic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User Profile Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Profile Updated Successfully
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       [ Profile ]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Username:
 *                   type: string
 *                 Phone:
 *                   type: string
 *                 Email:
 *                   type: string
 *                 Profile:
 *                   type: object
 *                   properties:
 *                     profilePicUrl:
 *                       type: string
 *                     coverPicUr:
 *                       type: string
 *                     bio:
 *                       type: string
 *       500:
 *         description: Failed to select user profile
 */

//Circles section

/**
 * @swagger
 * /api/circle/create:
 *   post:
 *     summary: Create a new circle
 *     description: Creates a new circle with an optional profile picture. The authenticated user becomes the admin of the circle.
 *     tags:
 *       - Circles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - circle_name
 *               - description
 *             properties:
 *               profile_Pic:
 *                 type: string
 *                 format: binary
 *                 description: Optional circle profile picture
 *               circle_name:
 *                 type: string
 *                 description: Name of the circle
 *               description:
 *                 type: string
 *                 description: Description of the circle
 *     responses:
 *       200:
 *         description: Circle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Circle created successfully
 *       500:
 *         description: Failed to create circle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create circle
 *                 circle:
 *                   type: object
 *                   description: Partially created circle object (if available)
 */

/**
 * @swagger
 * /api/circle/join/{circleId}:
 *   post:
 *     summary: Send a request to join a circle
 *     description: Authenticated users can request to join a specific circle. If already a member or pending, it returns an error.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: circleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the circle to join
 *     responses:
 *       200:
 *         description: Join request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request Sent To Join circle
 *                 request:
 *                   type: object
 *                   description: Join request object
 *       400:
 *         description: Already requested or already a member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Already requested or member
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/circle/approve/{circleId}/{userId}:
 *   post:
 *     summary: Approve a member's request to join a circle
 *     description: Only an admin of the circle can approve pending join requests.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: circleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the circle
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to approve
 *     responses:
 *       200:
 *         description: Member approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Member approved
 *       403:
 *         description: Only admin can approve requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only Admin can approve requests
 *       404:
 *         description: User not found in circle
 *       500:
 *         description: Failed to approve request
 */

/**
 * @swagger
 * /api/circle/add_member/{circleId}/{userId}:
 *   post:
 *     summary: Admin adds a user to a circle directly
 *     description: An admin can add another user to a circle without requiring their request or approval.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: circleId
 *         in: path
 *         required: true
 *         description: ID of the circle
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to add
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully added to the circle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User added to circle
 *       400:
 *         description: User is already in the circle or pending approval
 *       403:
 *         description: Only admins can add members
 *       500:
 *         description: Failed to add member to circle
 */


/**
 * @swagger
 * /api/circle/posts/{circleId}:
 *   get:
 *     summary: Get posts from all approved members of a circle
 *     description: Only approved members of a circle can view posts created by other members in the same circle.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: circleId
 *         in: path
 *         required: true
 *         description: ID of the circle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts from approved circle members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   circleId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Username:
 *                         type: string
 *                       Email:
 *                         type: string
 *       403:
 *         description: User is not authorized to view posts in this circle
 *       500:
 *         description: Failed to fetch circle posts
 */

/**
 * @swagger
 * /api/circle/pending/requests/{circleId}:
 *   get:
 *     summary: Get all pending join requests for a circle
 *     description: Admins can view a list of users who have requested to join the circle but are still pending approval.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: circleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the circle
 *     responses:
 *       200:
 *         description: List of pending join requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   circleId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: Pending
 *                   role:
 *                     type: string
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Username:
 *                         type: string
 *                       Email:
 *                         type: string
 *       403:
 *         description: Only circle admins can view pending requests
 *       500:
 *         description: Failed to fetch pending requests
 */
/**
 * @swagger
 * /api/circle/my_circle:
 *   get:
 *     summary: Get the list of user circles
 *     description: Retrieves all circles the authenticated user is a member of, including circle name, description, and profile picture.
 *     tags:
 *       [Circles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user circles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "34d5f2ab-1234-4567-8abc-98765efgh321"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *                   status:
 *                     type: string
 *                     example: "active"
 *                   Circle:
 *                     type: object
 *                     properties:
 *                       profile_Pics:
 *                         type: string
 *                         example: "https://res.cloudinary.com/your-cloud/image/upload/v123/profile.jpg"
 *                       circle_name:
 *                         type: string
 *                         example: "Tech Enthusiasts"
 *                       description:
 *                         type: string
 *                         example: "A circle for sharing tech trends and opportunities."
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found in any circle
 *       500:
 *         description: Internal server error
 */

//User
/**
 * @swagger
 * /api/get/all/users/:
 *   get:
 *     summary: Retrieve all users
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: obje]ct
 *               properties:
 *                 user:
 *                   type: array
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No users found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to select users
 */

//notification
/**
 * @swagger
 * /api/notification/:
 *   get:
 *     summary: Get all notifications for the authenticated user
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               notifications:
 *                 - id: "123"
 *                   senderId: "user1"
 *                   receiverId: "user2"
 *                   type: "add_member"
 *                   message: "You have been added to a new circle"
 *                   createdAt: "2025-07-10T12:00:00Z"
 *                   updatedAt: "2025-07-10T12:00:00Z"
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No notifications found.
 *       500:
 *         description: Failed to fetch notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch notifications
 */

/**
 * @swagger
 * /api/notification/admin:
 *   get:
 *     summary: Get notifications for an authenticated admin
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin notifications retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               notifications:
 *                 - id: "123"
 *                   senderId: "user1"
 *                   receiverId: "user2"
 *                   type: "add_member"
 *                   message: "You have been added to a new circle"
 *                   createdAt: "2025-07-10T12:00:00Z"
 *                   updatedAt: "2025-07-10T12:00:00Z"
 *       403:
 *         description: User is not authorized (not an admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to view notifications.
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No notifications found.
 *       500:
 *         description: Failed to fetch notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch notifications
 */
