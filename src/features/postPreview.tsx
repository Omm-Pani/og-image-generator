import { Helmet } from "react-helmet";

interface previewProps {
  ogImageUrl: string;
  postObj: {
    title: string;
    content: string;
  };
  image: File | undefined;
}

export default function PostPreview({
  ogImageUrl,
  postObj,
  image,
}: previewProps) {
  return (
    <div>
      <div>
        <div>
          <Helmet>
            {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
            <meta property="og:title" content={postObj.title} />
            <meta property="og:description" content={postObj.content} />
          </Helmet>

          <div className="p-6">
            <div className="text-center mb-4 bg-neutral-800 rounded-md p-2 text-white">
              OG Image Preview
            </div>
            <div>
              <div className="bg-white rounded-md mb-4 m-16 p-2">
                <div className="flex items-center px-4 py-2 justify-between">
                  <div className="flex">
                    <div className="mr-2 ">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Profile picture"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h5 className="text-md font-large text-gray-800">
                        {postObj.title ? postObj.title : "Title"}
                      </h5>
                      <p className="text-xs text-gray-500">Just Now</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 inline-block">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-gray-700">
                    {postObj.content
                      ? postObj.content
                      : "Your content will appear here"}
                  </p>
                  {image && (
                    <div className="relative w-auto h-72">
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-full h-full object-contain rounded-lg"
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between px-12 py-2 border-t border-gray-200 text-sm font-medium">
                  <div className="flex items-center space-x-1 text-gray-500 hover:cursor-pointer hover:text-blue-500 gap-1">
                    <i className="fa fa-thumbs-up "></i>
                    Like
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 hover:cursor-pointer hover:text-blue-500 gap-1">
                    <i className="fa fa-comment"></i>
                    Comment
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 hover:cursor-pointer hover:text-blue-500 gap-1">
                    <i className="fa fa-share"></i>
                    Share
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ogImageUrl && (
          <>
            <span>Link: </span>
            {"   "}
            <a className="hover: text-blue" href={ogImageUrl}>
              {ogImageUrl}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
