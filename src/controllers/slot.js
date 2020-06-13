import dotenv from 'dotenv';

dotenv.config();

class Slot {
  static async spin(_req, res) {
    return res.status(200).json({
      status: 200,
      data: {
        message: 'result of this spin returned successfully',
        result: []
      }
    });
  }
}

export default Slot;
