require 'bundler'
Bundler.setup()

namespace :xdr do

  # As rover-core adds more .x files, we'll need to update this array
  # Prior to launch, we should be separating our .x files into a separate
  # repo, and should be able to improve this integration.
  HAYASHI_XDR = [
                 "src/xdr/Rover-types.x",
                 "src/xdr/Rover-ledger-entries.x",
                 "src/xdr/Rover-transaction.x",
                 "src/xdr/Rover-ledger.x",
                 "src/xdr/Rover-overlay.x",
                 "src/xdr/Rover-RCA.x",
                ]

  task :update => [:download, :generate]

  task :download do
    require 'octokit'
    require 'base64'
    require 'fileutils'
    FileUtils.rm_rf "xdr"
    FileUtils.mkdir_p "xdr"

    client = Octokit::Client.new(:netrc => true)

    HAYASHI_XDR.each do |src|
      local_path = "xdr/" + File.basename(src)
      encoded    = client.contents("rover/rover-core", path: src).content
      decoded    = Base64.decode64 encoded

      IO.write(local_path, decoded)
    end
  end

  task :generate do
    require "pathname"
    require "xdrgen"

    paths = Pathname.glob("xdr/**/*.x")
    compilation = Xdrgen::Compilation.new(
      paths,
      output_dir: "src/generated",
      namespace:  "rover-xdr",
      language:   :javascript
    )
    compilation.compile
  end
end
