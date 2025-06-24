//Register Swagger documentation for the API endpoints
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
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
 *     summary: Sign in a user using email or username and password
 *     tags: [Auth]
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
 *                 description: Email or username of the user
 *                 example: johndoe@example.com
 *               Password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful or incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/forgot/password:
 *   post:
 *     summary: Send a password reset link to the user's email
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
 * /change/password:
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
 * /new/password:
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
 * /api/create/post:
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of the blog post.
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
 * /follow/followers:
 *   get:
 *     summary: Get posts from users that the authenticated user is following
 *     description: Retrieves all posts from users that the authenticated user is following. Requires authentication.
 *     tags:
 *       - Follow
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
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Username:
 *                         type: string
 *       500:
 *         description: Failed to fetch posts due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch posts
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
 * /api/messages/messages/{userId}/{chatPartnerId}:
 *   get:
 *     summary: Get all messages between two users
 *     description: Retrieve all messages exchanged between the authenticated user and the chat partner, ordered by timestamp.
 *     tags:
 *       - Messages
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