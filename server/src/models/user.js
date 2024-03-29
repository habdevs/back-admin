import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		_id: { 
			type: mongoose.Schema.Types.ObjectId, 
			auto: true 
		},
		username: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('User', UserSchema);

export default User
