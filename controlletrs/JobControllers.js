import { JobModel } from "../models/JobModel.js";

export const POSTNewJobController = async (req, res) => {
  const {
    job_position,
    company,
    location,
    jobType,
    workMode,
    description,
    requirements,
    salary,
    experienceLevel,
    education,postedBy,
    skills,
    applicants
  } = req.body;

  try {
    const isActive = true;

    if (
      !job_position ||
      !company ||
      !location ||
      !jobType ||
      !description ||
      !skills?.length
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newJob = new JobModel({
      job_position,
      company,
      location,
      jobType,
      workMode,
      description,
      requirements,
      salary,
      experienceLevel,
      education,
      skills,
      postedBy,
      isActive,
      applicants
    });

    await newJob.save();

    return res
      .status(201)
      .send({
        success: true,
        message: "Job Created Successfully",
        data: newJob,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to post job",
      error: error.message,
    });
  }
};
export const GETAllJobController = async (req, res) => {
  try {
    const data = await JobModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to GET jobs",
      error: error.message,
    });
  }
};
export const DELETEparticularJobController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Job ID not provided",
    });
  }

  try {
    const response = await JobModel.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).send({
        success: false,
        message: "Job not found or already deleted",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Job deleted successfully",
      data: response,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};
export const UPDATEJobController = async(req,res)=>{

    const {id} =req.params;
    const updateData= req.body;
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(id,updateData,{
            new:true,
            runValidators:true
        })

        if(!updatedJob){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

        return res.status(200).send({
            success:true,
            message:"Job Updated Successfully!",
            data:updatedJob
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Updating job!",
            error:error.message
        })
    }
};
export const GETAparticularJobController = async(req,res)=>{
    const {id}= req.params
    try {
        const getJob = await JobModel.findById(id);
        if(!getJob){
            return res.status(404).send({
                success:false,
                message:"Job Not Found",
                error:error.message
            })
        }

        return res.status(200).send({
            success:true,
            message:"Job retrieved Successfullty!",
            data:getJob
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Unabe to Get Job!",
            error:error.message
        })
    }
}
export const PATCHJobActiveStatusChangeController = async(req,res)=>{

    const {id}= req.params;
    const {isActive} = req.body
    if(typeof isActive!=='boolean'){
        return res.status(400).send({
            success:false,
            message:"Status is not a boolean Type",
            error:error.message
        })
    }
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(id, {
            $set :{isActive:isActive}},
            {new:true}
        );
        if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
        error:error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: `Job status updated to ${isActive ? 'active' : 'inactive'}`,
      data: updatedJob,
    });

    } catch (error) {
        res.status(500).send({
            suceess:false,
            message:"Unble to Change Status of the Job",
            error:error.message
        })
    }
}
export const GETSearchJobByKeywordController = async(req,res)=>{
  const {keyword=''}= req.query
   try {
    const regex = new RegExp(keyword,'i');

    const jobs = await JobModel.find({
      isActive:true,
      $or:[
        {job_position:regex},
        {company:regex},
        {location:regex},
        {description:regex},
        {skills:{$in :[regex]}},
      ]
    }).sort({createdAt:-1});

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      total: jobs.length,
      data: jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message
    });
  }
}


// In working
export const GETJobByRecruitorIdControllers= async(req,res)=>{
  const id= req.id
  try {
    const jobs= await JobModel.find({postedId:id});
    return res.status(200).send({
      success:true,
      length:jobs.length,
      message:"Job Derieved Successfully",
      data:jobs
    })
  } catch (error) {
    return res.status(500).send({
      success:false,
      message:"Unable to GET Jobs",
      error:error.message
    })
  }
}
// In working
export const DELETESelectedJobController = async(req,res)=>{

    try {
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Unable to Delete Jobs ",
            error:error.message
        })
    }
}
