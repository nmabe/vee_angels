import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { PlusCircleIcon, UserRoundPen, Lock, LockOpen, ShieldBan, ShieldCheck, LucideShieldCheck } from 'lucide-react'
import { AvatarFallback, AvatarImage, Avatar } from '../ui/avatar';
import { calculateAge } from '@/pages/admin/vAngelsAdmin'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import {
  editAngel,
  getAngels,
  deleteAngelImage,
  activateAnAngel,
  deactivateAnAngel
} from '@/store/admin/angel-slice'
import AddImages from './addImages'

const AngelModal = ({ angel }) => {
  let formData = new FormData();
  formData = angel;
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [editMode, setEditMode] = useState(true)
  const [userFormData, setUserFormData] = useState({
    ...formData,
    address: formData.address || {}
  })

  const dispatch = useDispatch()


  const activateAngel = (e) => {
    e.preventDefault();
    const id = userFormData._id;

    dispatch(activateAnAngel(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAngels())
        setUserFormData(angel);
        toast.success(`An Angel was successfully update`, {
          description: (
            <h2>{`${userFormData?.username} Angel has been updated`}</h2>
          ),
          action: {
            label: 'Dismiss',
            onClick: () => {
              
            }
          }
        })
      } else {
        toast.warning('There was a problem with your request.', {
          description: 'Something Went Wrong!!!',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    }) 
  };

  const deactivateAngel = (e) => {
    e.preventDefault();
    const id = userFormData._id;

    if (!editMode) {
      dispatch(deactivateAnAngel(id)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAngels())
          setUserFormData(angel);
          toast.success(`An Angel was successfully update`, {
            description: (
              <h2>{`${userFormData?.username} Angel has been updated`}</h2>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {
                
              }
            }
          })
        } else {
          toast.warning('There was a problem with your request.', {
            description: 'Something Went Wrong!!!',
            action: {
              label: 'Dismiss',
              onClick: () => {}
            },
            variant: 'destructive'
      });
  
      };
      });
    } else {
      toast.info('Edit mode is disabled', {
        description: 'Something Went Wrong!!!',
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: 'destructive'
      })
    }
  }

  const onImagesAdded = (newImages) => {
    const id = userFormData._id;

    const updatedUserFormData = {
      ...userFormData,
      profPicUrl: [...userFormData.profPicUrl, ...newImages]
    }
    setUserFormData(updatedUserFormData)

    dispatch(editAngel({ id, angelData: updatedUserFormData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAngels())
        setUserFormData(angel)
        setEditMode(true)
        toast.success(`An Angel was successfully update`, {
          description: (
            <h2>{`${updatedUserFormData?.username} Angel has been updated`}</h2>
          ),
          action: {
            label: 'Dismiss',
            onClick: () => {
              {}
            }
          }
        })
      } else {
        toast.warning('There was a problem with your request.', {
          description: 'Something Went Wrong!!!',
          action: {
            label: 'Dismiss',
            onClick: () => {  }
          },
          variant: 'destructive'
        })
      }
    })
  }

  const deleteImage = useCallback(
    (index) => (e) => {
      e.preventDefault()
      if (!userFormData.profPicUrl || !Array.isArray(userFormData.profPicUrl)) {
        toast.warning('There was a problem with your request.', {
          description: 'No profile images found for this angel.',
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
        return
      }
      const deletedImage = userFormData.profPicUrl[index]
      const updatedImages = userFormData.profPicUrl.filter((_, i) => i !== index)
      setUserFormData({
        ...userFormData,
        profPicUrl: updatedImages
      })

      dispatch(
        deleteAngelImage({ angelData: { ...userFormData, profPicUrl: updatedImages }, image: deletedImage })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAngels())
          // Do not reset userFormData to angel here to avoid discarding unsaved changes
          toast.success(`An Image was successfully deleted`, {
            description: (
              <h2>{`${userFormData?.username} Image has been deleted`}</h2>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {
              }
            },
            variant: 'success'
          })
        } else {
          toast.error('There was a problem with your request.', {
            description: <h2>{`Something went wrong!!!!`}</h2>,
            action: {
              label: 'Dismiss',
              onClick: () => {}
            },
            variant: 'destructive'
          })
        }
      })
    },
    [userFormData, dispatch]
  )

  const unlockEditModeAngel = (e) => {
    e.preventDefault()
    setEditMode(!editMode)
  }


  const submitAngel = (e) => {
    e.preventDefault()
    if (calculateAge(userFormData.dateOfBirth) < 18) {
      toast.warning('No young angels allowed.', {
        description: 'angel must be 18 years or older',
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: 'destructive'
      })
    } else {
      const id = userFormData._id

      dispatch(editAngel({ id, angelData: userFormData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAngels())
          setUserFormData(angel)
          setEditMode(true)
          toast.success(`An Angel was successfully update`, {
            description: (
              <h2>{`${userFormData?.username} Angel has been updated`}</h2>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {
                
              }
            }
          })
        } else {
          toast.warning('There was a problem with your request.', {
            description: 'Something Went Wrong!!!',
            action: {
              label: 'Dismiss',
              onClick: () => {}
            },
            variant: 'destructive'
          })
        }
      })
    }
  }
  const deactivateBtns = () => {
    const status = angel.status;
    if (status === 'Active') {
      return (
        <div
          className="text-m text-gray-400 flex gap-2 bg-[#892f82]-100 border border-gray-200 rounded py-1 ml-2 px-1 cursor-pointer hover:text-[#892f82]"
          onClick={(e) => deactivateAngel(e)}
        >
          Deactivate <ShieldBan className="" />
        </div>
      )
    }else {
      return (
        <div
          className="text-m text-gray-400 flex gap-2 bg-[#892f82]-100 border border-gray-200 rounded py-1 ml-2 px-1 cursor-pointer hover:text-[#892f82]"
          onClick={(e) => activateAngel(e)}
        >
          Activate <LucideShieldCheck className="text-[#892f82]" />
        </div>
      )
    }
  }

  const editBtns = (btnText) => {
    switch (btnText) {
      case 'Edit':
        return (
          <div
            className="text-m text-gray-400 flex gap-2 bg-gray-100 border border-gray-200 rounded py-1 px-1 ml-2 cursor-pointer hover:text-[#892f82]"
            onClick={unlockEditModeAngel}
          >
            {' '}
            {btnText}
            {editMode ? (
              <Lock className="" />
            ) : (
              <LockOpen className="text-[#892f82]" />
            )}
          </div>
        )
        break
      default:
        return (
          <div
            className="text-m text-gray-400 flex ml-2 gap-2 bg-gray-100 border border-gray-200 rounded py-1 px-1 cursor-pointer hover:text-[#892f82]"
            onClick={submitAngel}
          >
            {btnText} <UserRoundPen />
          </div>
        )
        break
    }
  }

  useEffect(() => {
    //     dispatch(getAngels());
  }, [dispatch])

  return (
    <Fragment>
      <Dialog className="">
        <DialogTrigger className="rounded-[5px] w-20 h-7 hover:bg-white hover:text-gray-500 inline cursor-pointer px-3 text-white block bg-gray-800">
          <span className="text-sm font-medium flex flex-row items-center justify-center">
            {' '}
            Edit
            <UserRoundPen className="w-4 h-4 mx-auto" />
          </span>
        </DialogTrigger>
        <DialogContent className={(angel.status === 'Active') ? 'bg-white max-w-4xl max-h-[80vh] overflow-auto' : 'bg-red-500 max-w-4xl max-h-[80vh] overflow-auto'}>
          <DialogHeader className="">
            <DialogTitle className="text-3xl font-bold text-[#892f82] underline decoration-double decoration-[#892f82] decoration-2 underline-offset-4">
              {angel.username}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center ">
            <Avatar className="w-[25%] h-[320px] rounded-[12px] self-start">
              <AvatarImage src={angel.profPicUrl[currentImageIndex]} />
              <AvatarFallback>V-A</AvatarFallback>
            </Avatar>
            <hr className="bg-gray-500 h-[80%] w-[1.5px] mx-4" />

            <div className="flex flex-col w-full">
              <div className="flex flex w-full justify-start items-center mb-4">
                {editBtns('Edit')}
                {editBtns('Submit')}
                {deactivateBtns('Deactivate')}
              </div>
              <form className="flex flex-row items-center space-x-2  w-full h-[320px] ">
                <div className="space-y-1 border rounded w-full  self-start py-1 px-2 overflow-auto h-[100%]">
                  <div>
                    <label className="block text-gray-400 ">Username</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.username}
                        disabled={editMode}
                        className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            username: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400">Firstname</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.firstname}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            firstname: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 ">Lastname</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.lastname}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            lastname: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 ">
                      Date Of Birth
                    </label>
                    <div className="flex flex-row items-center space-x-2">
                      {!editMode ? (
                        <input
                          className="appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="Date"
                          type="date"
                          disabled={editMode}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              dateOfBirth: e.target.value
                            })
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={angel.dateOfBirth.substr(0, 10)}
                          disabled
                          className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 ">Gender</label>
                    <div className="flex flex-row items-center space-x-2">
                      <Select
                        onValueChange={(value) =>
                          setUserFormData({
                            ...userFormData,
                            gender: value
                          })
                        }
                        disabled={editMode}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={angel.gender} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="hover:bg-slate-200"
                            value="Male"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-slate-200"
                            value="Female"
                          >
                            Female
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-slate-200"
                            value="Undisclosed"
                          >
                            Undisclosed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400">Joined</label>
                    <input
                      type="text"
                      placeholder={angel.createdAt}
                      disabled
                      className="appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400">
                      Last updated at
                    </label>
                    <input
                      type="text"
                      placeholder={angel.updatedAt}
                      disabled
                      className="appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className=" border rounded w-full py-2 px-3">
                    <label className="block text-gray-400">FaceBook</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.socialMedia?.faceBook}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            socialMedia: {
                              ...userFormData.socialMedia,
                              facebook: e.target.value
                            }
                          })
                        }
                      />
                    </div>

                    <label className="block text-gray-400">X/Twitter</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.socialMedia?.twitter}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            socialMedia: {
                              ...userFormData.socialMedia,
                              twitter: e.target.value
                            }
                          })
                        }
                      />
                    </div>
                    <label className="block text-gray-400">Instagram</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.socialMedia?.instagram}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            socialMedia: {
                              ...userFormData.socialMedia,
                              instagram: e.target.value
                            }
                          })
                        }
                      />
                    </div>
                    <label className="block text-gray-400">TikTok</label>
                    <div className="flex flex-row items-center space-x-2">
                      <input
                        type="text"
                        placeholder={angel.socialMedia?.tiktok}
                        disabled={editMode}
                        className="appearance-none border rounded  w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            socialMedia: {
                              ...userFormData.socialMedia,
                              tiktok: e.target.value
                            }
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border rounded w-full self-start py-1 px-2 space-y-1 overflow-auto h-[100%]">
                  <label className="block text-gray-400">Phone Number</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="number"
                      placeholder={'0' + angel.phoneNumber}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          phoneNumber: e.target.value
                        })
                      }
                    />
                  </div>

                  <label className="block text-gray-400">Province</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="text"
                      placeholder={angel.address?.province}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          address: {
                            ...(userFormData?.address || {}),
                            province: e.target.value
                          }
                        })
                      }
                    />
                  </div>

                  <label className="block text-gray-400">City</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="text"
                      placeholder={angel.address?.city}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          address: {
                            ...(userFormData.address || {}),
                            city: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <label className="block text-gray-400">Suburb</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="text"
                      placeholder={angel.address?.suburb}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          address: {
                            ...(userFormData.address || {}),
                            suburb: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <label className="block text-gray-400">Street Name</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="text"
                      placeholder={angel.address?.street}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          address: {
                            ...(userFormData.address || {}),
                            street: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <label className="block text-gray-400 ">House Number</label>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      type="number"
                      placeholder={angel.address?.houseNumber}
                      disabled={editMode}
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          address: {
                            ...(userFormData.address || {}),
                            houseNumber: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 border rounded w-full py-2 px-2">
                    <label htmlFor="bio" className="block text-gray-400">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      placeholder={angel.bio}
                      disabled={editMode}
                      name="bio"
                      rows="6"
                      className="appearance-none border rounded w-full mr-1 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          bio: e.target.value
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-row gap-2 bg-gray-400/10 rounded-[12px] p-3 h-[200px] w-[100%]  overflow-auto overscroll-auto md:overscroll-contain">
            <AddImages onImagesAdded={onImagesAdded} />
            {angel.profPicUrl.map((url, index) => {
              return (
                <div key={index} className="w-[120px] h-[180px] " onClick={() => setCurrentImageIndex(index)}>
                  <div
                    className="w-4 h-4 right-1 bg-red-400 rounded-[50px]  text-xs text-extrabold text-white align-center justify-center hover:cursor-pointer hover:bg-black px-1 px-1 z-10 relative"
                    onClick={deleteImage(index)}
                  >
                    X
                  </div>
                  <Avatar
                    key={index}
                    className="w-full h-full rounded-[12px] top-[-15px] left-0"
                  >
                    <AvatarImage src={url} />
                    <AvatarFallback>V-A</AvatarFallback>
                  </Avatar>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AngelModal
