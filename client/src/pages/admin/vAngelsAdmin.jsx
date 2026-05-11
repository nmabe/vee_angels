import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { addAngelFormControl } from '@/config'
import { SmilePlus } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import UploadImage from '@/components/admin/uploadImage'
import { useDispatch, useSelector } from 'react-redux'
import { addAngel, getAngels } from '@/store/admin/angel-slice'
import AngelCard from '@/components/admin/angelCard'
import { toast } from 'sonner'

// Theming & scroll effect
const bgGrid = (
  <div>
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,247,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
    <style>{`
      .drop-shadow-glow {
        filter: drop-shadow(0 0 8px #00fff7aa);
      }
      .scroll-fantasy::-webkit-scrollbar {
        width: 8px;
        background: transparent;
      }
      .scroll-fantasy::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #00fff7 10%, #ff6fff 90%);
        border-radius: 8px;
      }
      .scroll-fantasy {
        scrollbar-width: thin;
        scrollbar-color: #00fff7 #23243a;
      }
      .scroll-cyber::-webkit-scrollbar {
        width: 10px;
        background: transparent;
      }
      .scroll-cyber::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #00fff7 10%, #ff6fff 90%);
        border-radius: 12px;
        box-shadow: 0 0 12px #00fff7cc, 0 0 24px #ff6fff99;
        border: 2px solid #23243a;
      }
      .scroll-cyber {
        scrollbar-width: thin;
        scrollbar-color: #00fff7 #23243a;
        position: relative;
        /* Fading edge top/bottom */
        mask-image: linear-gradient(to bottom, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
      }
      /* Parallax shimmer background */
      .scroll-cyber::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: repeating-linear-gradient(
          120deg,
          rgba(0,255,247,0.08) 0px,
          rgba(0,255,247,0.08) 2px,
          transparent 2px,
          transparent 12px
        );
        animation: shimmer-move 6s linear infinite;
        z-index: 1;
      }
      @keyframes shimmer-move {
        0% { background-position: 0 0; }
        100% { background-position: 120px 120px; }
      }
    `}</style>
  </div>
)

export const initialFormData = {
  username: '',
  dateOfBirth: null,
  gender: null,
  price: 0,
  address: {}
}

export const calculateAge = (dateOfBirth) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return age;
}

export default function VAngelsAdminPage() {
  const [isCreateAngelDialogOpen, setIsCreateAngelDialogOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFiles, setImageFiles] = useState([])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const { angelsList } = useSelector((state) => state.adminAngel)
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if (calculateAge(formData.dateOfBirth) < 18) {
      toast.warning('No young angels allowed.', {
        description: 'angel must be 18 years or older',
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: 'destructive'
      })
    } else {
      dispatch(addAngel(formData)).then((data) => {
        if (data?.payload?.success) {
          setUploadedImage(null)
          setImageFiles([])
          setFormData(initialFormData)
          toast.success(`An Angel was successfully added the Vee Database`, {
            description: (
              <h2>
                {' '}
                {data?.payload?.angel?.username} is now part of Vee's angels{' '}
              </h2>
            ),
            action: {
              label: 'Proceed',
              onClick: () => {}
            }
          })
        } else {
          if (typeof data.payload.message === 'object') {
            Object.keys(data.payload.message).forEach(function (key, index) {
              toast.info(
                String(`${key}`).charAt(0).toUpperCase() +
                  String(`${key}`).slice(1),
                {
                  description:
                    String(`${data.payload.message[key]}`)
                      .charAt(0)
                      .toUpperCase() +
                    String(`${data.payload.message[key]}`).slice(1),
                  action: {
                    label: 'Dismiss',
                    onClick: () => {}
                  }
                }
              )
            })
          } else {
            toast.error('There was a problem with your request.', {
              description: data.payload.message || 'Something Went Wrong!!!',
              action: {
                label: 'Dismiss',
                onClick: () => {}
              },
              variant: 'destructive'
            })
          }
        }
      })
    }
  }

  useEffect(() => {
    if (uploadedImage) {
      setFormData({
        ...formData,
        profPicUrl: uploadedImage
      })
    }
    dispatch(getAngels())
    // eslint-disable-next-line
  }, [uploadedImage, dispatch])

  return (
    <Fragment>
      {
      
      }
      <div className="relative z-10 flex flex-col min-h-screen bg-gradient-to-br from-[#0f1021] via-[#23243a] to-[#1a1b2f]">
        <div className="flex justify-between items-center px-6 pt-8 pb-4">
          <h1 className="text-3xl font-extrabold text-cyan-300 tracking-widest drop-shadow-glow">
            ANGELS ADMIN PANEL
          </h1>
          <Button
            onClick={() => setIsCreateAngelDialogOpen(!isCreateAngelDialogOpen)}
            className="bg-cyan-400 text-[#23243a] hover:bg-cyan-300 rounded-xl px-6 py-3 font-extrabold tracking-widest shadow-cyan-400/30 shadow-lg border-2 border-cyan-300/40"
          >
            <SmilePlus className="mr-2" />
            Add an Angel
          </Button>
        </div>
        <div className="flex-1 w-full px-2 md:px-6 pb-8">
          <div
            className="scroll-fantasy grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 md:p-4"
            style={{
              maxHeight: 'calc(100vh - 160px)',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}
          >
            {angelsList && angelsList.length > 0 ? (
              angelsList.map((angel) => (
                <AngelCard angel={angel} key={angel._id} />
              ))
            ) : (
              <div className="col-span-full text-center text-cyan-400 py-12 text-lg">
                No angels found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Sheet
        open={isCreateAngelDialogOpen}
        onOpenChange={setIsCreateAngelDialogOpen}
      >
        <SheetContent className="overflow-auto w-[400px] sm:w-[540px] bg-gradient-to-br from-[#23243a] to-[#1a1b2f] border-cyan-400/10 shadow-xl">
          <SheetHeader className="mb-8">
            <SheetTitle className="p-4 font-extrabold text-xl border-b border-cyan-400/10 text-cyan-200">
              Add a new angel
            </SheetTitle>
          </SheetHeader>
          <UploadImage
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <CommonForm
            formControl={addAngelFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={`Add Angel ${formData.username || ''}`}
          />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
