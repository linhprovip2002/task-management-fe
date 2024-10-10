import {
  Close as CloseIcon,
  FeaturedPlayList as FeaturedPlayListIcon,
  Subject as SubjectIcon,
  FormatListBulleted as FormatListBulletedIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  PersonAddAlt as PersonAddAltIcon,
  Person4Outlined as Person4OutlinedIcon,
  Label as LabelIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  AttachmentOutlined as AttachmentOutlinedIcon,
  InsertPhoto as InsertPhotoIcon,
  Crop169 as Crop169Icon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  SaveAsOutlined as SaveAsOutlinedIcon,
  BackupTableOutlined as BackupTableOutlinedIcon,
  ShareOutlined as ShareOutlinedIcon,
} from '@mui/icons-material';
import { ButtonBoardCard } from '../ButtonBoardCard';

export const BoardCard = ({ onShowBoardCard }) => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 overflow-auto z-50">
      <div className="mt-20 mb-10">
        <div className="relative flex justify-between min-w-[700px] bg-white rounded-[8px] p-2 font-medium text-[12px] z-50">
          <div className="flex-1 p-2">
            <div className="flex p-2">
              <div>
                <FeaturedPlayListIcon fontSize="small" />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-[16px] mb-2">KTPM</div>
                <div className="flex items-center text-[12px] mb-2">
                  <span className="mr-2 font-normal">in the list</span>
                  <div className="cursor-pointer text-[12px] px-1 bg-gray-300 rounded-[2px] font-bold">Doing</div>
                </div>
                <div className="flex items-center text-[12px] mb-2">
                  <span className="mr-2">Notification</span>
                </div>
                <ButtonBoardCard isActive={true} nameBtn={'Moniter'} className={'w-[100px] justify-center'}>
                  <RemoveRedEyeIcon className="mr-2 ml-1" fontSize="small" />
                </ButtonBoardCard>
              </div>
            </div>
            <div className="flex p-2">
              <div>
                <SubjectIcon fontSize="small" />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-[16px] mb-2">Describe</div>
                <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-full text-[14px] mb-2 p-2 pb-6 rounded-[4px]">
                  <div>Add more detailed description...</div>
                </div>
              </div>
            </div>
            <div className="flex p-2">
              <div>
                <FormatListBulletedIcon fontSize="small" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <div className="text-[16px] mb-2">Work</div>
                  <ButtonBoardCard isActive={true} nameBtn={'Show details'} className={'w-[100px] justify-center'} />
                </div>
                <div className="flex items-center text-[12px] mb-2"></div>
                <div className="flex items-center text-[12px] mb-2"></div>
              </div>
            </div>
          </div>
          <div className="min-w-[180px]">
            <div className="flex items-center flex-col mt-16 mb-4 mx-2">
              <ButtonBoardCard nameBtn={'Join'}>
                <PersonAddAltIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Member'}>
                <Person4OutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Label'}>
                <LabelIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'What to do'}>
                <CheckBoxOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Day'}>
                <AccessTimeOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Attached'}>
                <AttachmentOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Cover photo'}>
                <InsertPhotoIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Custom Fields'}>
                <Crop169Icon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Move'}>
                <ArrowForwardOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Copy'}>
                <ContentCopyOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Create a template'}>
                <SaveAsOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Storage'}>
                <BackupTableOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
              <ButtonBoardCard nameBtn={'Share'}>
                <ShareOutlinedIcon className="mr-2 ml-1" fontSize="small" />
              </ButtonBoardCard>
            </div>
          </div>
          <CloseIcon
            onClick={onShowBoardCard}
            className="absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
          />
        </div>
      </div>
    </div>
  );
};
