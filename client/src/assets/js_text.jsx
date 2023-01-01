                   <li
                      key={angel._id}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#23243a]/80 to-[#1a1b2f]/80 rounded-xl p-4 border border-cyan-400/10 shadow-cyan-400/10 shadow-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                    >

                      <div className="relative">
                      <Dialog key={angel._id}>
                        <DialogTrigger asChild>
                          <div  >
                        <img
                          src={angel.profPicUrl[0]}
                          alt={angel.username}
                          className="w-14 h-14 rounded-full border-2 border-cyan-400/40 shadow-lg object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-400 rounded-full border-2 border-[#23243a]" />
                                              </div>
                        </DialogTrigger>
                        <AngelPopUpCard angel={angel} isLiked={false} handleLike={() => {}}/>
                      </Dialog>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-cyan-100 text-lg truncate flex items-center gap-2">
                          {angel.username}
                          <span
                            className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"
                            title="Pending approval"
                          ></span>
                        </div>
                        <div className="text-xs text-cyan-400 truncate">
                          {angel.address?.city}
                        </div>
                        <div className="text-xs text-cyan-400">
                          Applied: { /* timeAgo.format( new Date(Date.now() - 22 * 60 * 60 * 1000)) */}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-400 to-green-400 text-[#23243a] hover:from-cyan-300 hover:to-green-300 rounded-lg px-4 py-1 font-bold flex items-center shadow"
                          onClick={() => handleApprove(angel._id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-400 to-red-400 text-[#23243a] hover:from-pink-300 hover:to-red-300 rounded-lg px-4 py-1 font-bold flex items-center shadow"
                          onClick={() => handleReject(angel._id, angel.profPicUrl)}
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </div>

                    </li>